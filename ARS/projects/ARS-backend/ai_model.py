import pandas as pd
import numpy as np
from typing import List, Dict, Any
import joblib # For loading models
import os

# Define the path to the trained model and feature columns
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "reputation_model.joblib")
FEATURE_COLUMNS_PATH = os.path.join(MODEL_DIR, "feature_columns.joblib")

# Global variables to store the loaded model and feature columns
_reputation_model = None
_feature_columns = None

def _load_model_and_features():
    """Loads the pre-trained model and feature columns from disk."""
    global _reputation_model, _feature_columns
    if _reputation_model is None or _feature_columns is None:
        if not os.path.exists(MODEL_PATH) or not os.path.exists(FEATURE_COLUMNS_PATH):
            print(f"Warning: Model or feature columns not found at {MODEL_PATH} or {FEATURE_COLUMNS_PATH}.")
            print("Please run `poetry run python train_model.py` in the ARS-backend directory first.")
            # Fallback for development if model isn't trained yet
            _reputation_model = None # Keep as None, trigger dummy score
            _feature_columns = None
            return

        print(f"Loading model from {MODEL_PATH}...")
        _reputation_model = joblib.load(MODEL_PATH)
        _feature_columns = joblib.load(FEATURE_COLUMNS_PATH)
        print("Model and features loaded successfully.")

# Load model when the module is imported (or on first use)
_load_model_and_features()


async def fetch_transaction_data(algorand_address: str, indexer_client: Any, limit_per_page: int = 100, max_pages: int = 10) -> List[Dict[str, Any]]:
    """
    Fetches comprehensive transaction data for a given Algorand address from the Indexer,
    handling pagination.

    Args:
        algorand_address (str): The Algorand address of the user.
        indexer_client (Any): An initialized Algorand IndexerClient instance.
        limit_per_page (int): Number of transactions to fetch per page. Max 1000 for Indexer.
        max_pages (int): Maximum number of pages to fetch. Helps prevent overly long fetches.

    Returns:
        List[Dict[str, Any]]: A list of dictionaries, each representing a transaction.
                              Returns mock data if actual fetching fails or is not desired for testing.
    """
    print(f"Fetching transactions for address: {algorand_address} from Indexer (with pagination)...")
    all_transactions = []
    next_token = None
    page_count = 0

    try:
        while page_count < max_pages:
            params = {"limit": limit_per_page}
            if next_token:
                params["next"] = next_token

            transactions_response = indexer_client.lookup_account_transactions(algorand_address, **params)

            if 'transactions' in transactions_response and transactions_response['transactions']:
                all_transactions.extend(transactions_response['transactions'])
                print(f"Fetched {len(transactions_response['transactions'])} transactions on page {page_count + 1}.")
            else:
                print(f"No more transactions or empty page encountered on page {page_count + 1}.")
                break # No more transactions

            next_token = transactions_response.get("next-token")
            if not next_token:
                print("No next-token found, finished fetching all pages.")
                break # No more pages

            page_count += 1

        print(f"Total transactions fetched for {algorand_address}: {len(all_transactions)}")
        return all_transactions

    except Exception as e:
        print(f"Error fetching transactions from Indexer: {e}. Returning mock data for demonstration.")
        # Fallback to mock data for local testing if Indexer isn't running or accessible
        # Ensure mock data has 'round-time' for frequency calculation
        return [
            {"id": "mock_tx_1", "sender": algorand_address, "receiver": "ABCDEF...", "amount": 1000000, "tx-type": "pay", "round-time": 1678886400, "payment-transaction": {"amount": 1000000, "receiver": "ABCDEF..."}},
            {"id": "mock_tx_2", "sender": "GHIJKL...", "receiver": algorand_address, "amount": 500000, "tx-type": "pay", "round-time": 1678886500, "payment-transaction": {"amount": 500000, "receiver": algorand_address}},
            {"id": "mock_tx_3", "sender": algorand_address, "receiver": "MNOPQR...", "amount": 2000000, "tx-type": "pay", "round-time": 1678886600, "payment-transaction": {"amount": 2000000, "receiver": "MNOPQR..."}},
            {"id": "mock_tx_4", "sender": algorand_address, "app-call-tx": {"application-id": 123}, "tx-type": "appl", "round-time": 1678886700},
            {"id": "mock_tx_5", "sender": algorand_address, "receiver": "QRSTUV...", "amount": 750000, "tx-type": "pay", "round-time": 1678886800, "payment-transaction": {"amount": 750000, "receiver": "QRSTUV..."}},
            # Add more mock data if needed for testing pagination scenarios
            {"id": "mock_tx_6", "sender": "ZXYWVU...", "receiver": algorand_address, "amount": 1200000, "tx-type": "pay", "round-time": 1678886900, "payment-transaction": {"amount": 1200000, "receiver": algorand_address}},
            {"id": "mock_tx_7", "sender": algorand_address, "asset-transfer-tx": {"amount": 1, "asset-id": 1001, "receiver": "ASSET_RECV"}, "tx-type": "axfer", "round-time": 1678887000}
        ]


def preprocess_data(transactions_data: List[Dict[str, Any]], algorand_address: str) -> pd.DataFrame:
    """
    Preprocesses raw transaction data into a format suitable for the AI model.
    This is where you'd extract features for reputation scoring.
    """
    if not transactions_data:
        # Return a DataFrame with expected columns but all zeros/defaults
        # Ensure these columns match the 'features' list in train_model.py
        return pd.DataFrame(columns=[
            'num_transactions', 'total_algo_sent', 'total_algo_received',
            'num_app_calls', 'num_unique_counterparties', 'transaction_frequency'
        ], data=[[0, 0, 0, 0, 0, 0]])

    df = pd.DataFrame(transactions_data)

    num_transactions = len(df)

    # Initialize totals
    total_algo_sent = 0
    total_algo_received = 0
    num_app_calls = 0
    unique_counterparties = set()

    for _, row in df.iterrows():
        tx_type = row.get('tx-type')
        sender = row.get('sender')
        receiver = None

        # Determine amount and receiver based on transaction type
        if tx_type == 'pay':
            payment_tx = row.get('payment-transaction')
            if payment_tx:
                amount = payment_tx.get('amount', 0)
                receiver = payment_tx.get('receiver')
                if sender == algorand_address:
                    total_algo_sent += amount
                elif receiver == algorand_address:
                    total_algo_received += amount
        elif tx_type == 'axfer': # Asset transfer
            asset_tx = row.get('asset-transfer-transaction')
            if asset_tx:
                receiver = asset_tx.get('receiver') # For counterparty tracking
                # For reputation, you might want to specifically track certain ASAs or volumes
        elif tx_type == 'appl': # Application call
            num_app_calls += 1
            # You might want to extract specific app-call arguments or IDs
        # Add more logic for other transaction types (acfg, afrz, keyreg etc.) if relevant for features

        # Track unique counterparties (for both sender and receiver roles)
        if sender and sender != algorand_address:
            unique_counterparties.add(sender)
        if receiver and receiver != algorand_address: # Add receiver only if it's not the current account
            unique_counterparties.add(receiver)

    num_unique_counterparties = len(unique_counterparties)

    # Convert microAlgos to Algos
    total_algo_sent_algo = total_algo_sent / 1_000_000
    total_algo_received_algo = total_algo_received / 1_000_000

    # Calculate transaction frequency
    transaction_frequency = 0
    if num_transactions > 1:
        # Assuming 'round-time' is present and represents Unix timestamp
        # Filter out transactions without 'round-time'
        round_times = [tx.get('round-time', 0) for tx in transactions_data if tx.get('round-time')]
        if len(round_times) > 1:
            min_time = min(round_times)
            max_time = max(round_times)
            time_span_seconds = max_time - min_time
            if time_span_seconds > 0:
                # Transactions per day
                transaction_frequency = num_transactions / (time_span_seconds / (24 * 3600))
            else: # All transactions occurred at the same timestamp
                transaction_frequency = num_transactions # Or a very high number, depends on definition

    # Create a feature vector (DataFrame with one row)
    features_df = pd.DataFrame({
        'num_transactions': [num_transactions],
        'total_algo_sent': [total_algo_sent_algo],
        'total_algo_received': [total_algo_received_algo],
        'num_app_calls': [num_app_calls],
        'num_unique_counterparties': [num_unique_counterparties],
        'transaction_frequency': [transaction_frequency]
    })

    # Ensure the DataFrame has all required features, even if some were not extracted
    # This prevents errors if a feature is missing when passed to the model
    # (e.g., if a new feature is added to training but not extracted for a particular transaction type)
    # We load _feature_columns to ensure consistency.
    if _feature_columns:
        for col in _feature_columns:
            if col not in features_df.columns:
                features_df[col] = 0.0 # Add missing columns with default value

        # Reorder columns to match training order
        features_df = features_df[_feature_columns]

    return features_df


def predict_reputation_score(transactions_data: List[Dict[str, Any]], algorand_address: str) -> float:
    """
    Predicts the reputation score based on processed transaction data using the trained model.
    """
    # Ensure the model and features are loaded
    _load_model_and_features()

    features_df = preprocess_data(transactions_data, algorand_address)

    if _reputation_model is None or _feature_columns is None:
        print("Model not loaded, falling back to a default/heuristic score.")
        # Fallback to a simple heuristic if model isn't loaded (e.g., during initial setup)
        if features_df.empty:
            return 0.0

        # Ensure features are accessed safely, even if columns are missing
        num_tx = features_df.get('num_transactions', pd.Series([0.0])).iloc[0]
        algo_received = features_df.get('total_algo_received', pd.Series([0.0])).iloc[0]
        num_app_calls = features_df.get('num_app_calls', pd.Series([0.0])).iloc[0]

        reputation = (num_tx * 0.5) + (algo_received * 0.0001) + (num_app_calls * 2)
        reputation = max(0.0, min(100.0, reputation))
        return float(f"{reputation:.2f}")


    if features_df.empty:
        # If no transactions, predict 0 or a base reputation
        # Or, pass a DataFrame of zeros with correct columns to the model
        print("No features extracted, returning base reputation.")
        return 0.0 # Or some default base score

    # Make prediction using the loaded model
    try:
        # The model expects input features in the exact same order as during training.
        # preprocess_data now handles this by ordering columns using _feature_columns.
        predicted_score = _reputation_model.predict(features_df)[0]

        # Cap the score between 0 and 100
        predicted_score = max(0.0, min(100.0, predicted_score))

        print(f"Predicted reputation score using model: {predicted_score:.2f}")
        return float(f"{predicted_score:.2f}")
    except Exception as e:
        print(f"Error predicting reputation with model: {e}. Falling back to default.")
        return 0.0 # Fallback in case of prediction error or model issues
def get_feature_columns() -> List[str]:
    """
    Returns the list of feature columns used in the model.
    This is useful for ensuring consistency in preprocessing.
    """
    _load_model_and_features()  # Ensure features are loaded
    return _feature_columns if _feature_columns else []
def get_model_info() -> Dict[str, Any]:
    """
    Returns basic information about the loaded model and feature columns.
    This can be useful for debugging or API responses.
    """
    _load_model_and_features()  # Ensure model and features are loaded
    return {
        "model_loaded": _reputation_model is not None,
        "feature_columns": _feature_columns if _feature_columns else [],
        "model_path": MODEL_PATH,
        "feature_columns_path": FEATURE_COLUMNS_PATH
    }
# Ensure the model and feature columns are loaded when this module is imported
_load_model_and_features()

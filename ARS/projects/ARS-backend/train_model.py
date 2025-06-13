import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib # For saving/loading models
import os
import random # For simulating data

# Ensure the 'models' directory exists
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)
MODEL_PATH = os.path.join(MODEL_DIR, "reputation_model.joblib")
FEATURE_COLUMNS_PATH = os.path.join(MODEL_DIR, "feature_columns.joblib")


def generate_synthetic_data(num_samples: int = 1000):
    """
    Generates synthetic transaction features and corresponding reputation scores.
    """
    print(f"Generating {num_samples} synthetic data samples...")
    data = {
        'num_transactions': np.random.randint(1, 500, num_samples),
        'total_algo_sent': np.random.rand(num_samples) * 1000, # Max 1000 ALGO
        'total_algo_received': np.random.rand(num_samples) * 2000, # Max 2000 ALGO
        'num_app_calls': np.random.randint(0, 50, num_samples),
        'num_unique_counterparties': np.random.randint(1, 100, num_samples),
        'transaction_frequency': np.random.rand(num_samples) * 5 # Transactions per day
    }
    df = pd.DataFrame(data)

    # Create a synthetic 'reputation_score' based on a linear combination of features
    df['reputation_score'] = (
        0.1 * df['num_transactions'] +
        0.005 * df['total_algo_received'] -
        0.002 * df['total_algo_sent'] +
        0.5 * df['num_app_calls'] +
        0.3 * df['num_unique_counterparties'] +
        5 * df['transaction_frequency'] +
        np.random.randn(num_samples) * 5 # Add some noise
    )

    # Cap reputation scores between 0 and 100
    df['reputation_score'] = np.clip(df['reputation_score'], 0, 100)
    print("Synthetic data generated.")
    return df

def train_reputation_model():
    """
    Generates synthetic data, trains a RandomForestRegressor, and saves the model.
    """
    df = generate_synthetic_data()

    # Define features (X) and target (y)
    features = [
        'num_transactions', 'total_algo_sent', 'total_algo_received',
        'num_app_calls', 'num_unique_counterparties', 'transaction_frequency'
    ]
    X = df[features]
    y = df['reputation_score']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data split: Train={len(X_train)} samples, Test={len(X_test)} samples.")

    # Initialize and train the RandomForestRegressor model
    model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    print("Training RandomForestRegressor model...")
    model.fit(X_train, y_train)
    print("Model training complete.")

    # Evaluate the model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Model Mean Absolute Error on test set: {mae:.2f}")

    # Save the trained model
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

    # Save the list of feature columns used for training.
    joblib.dump(features, FEATURE_COLUMNS_PATH)
    print(f"Feature columns saved to {FEATURE_COLUMNS_PATH}")

if __name__ == "__main__":
    train_reputation_model()

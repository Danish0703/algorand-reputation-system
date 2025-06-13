import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from .ai_model import predict_reputation_score, fetch_transaction_data
from .ipfs_utils import upload_to_ipfs, get_from_ipfs
from algosdk.v2client import indexer

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Algorand Reputation System Backend",
    description="AI-powered reputation scoring and Soulbound NFT management API."
)

ALGOD_SERVER = os.getenv("ALGOD_SERVER")
INDEXER_SERVER = os.getenv("INDEXER_SERVER")

if not ALGOD_SERVER or not INDEXER_SERVER:
    raise ValueError("ALGOD_SERVER and INDEXER_SERVER environment variables must be set.")

# Indexer client for fetching transaction data
indexer_client = indexer.IndexerClient(indexer_token="", algod_address=INDEXER_SERVER)

# --- Request/Response Models ---
class ReputationPredictionRequest(BaseModel):
    algorand_address: str

class ReputationPredictionResponse(BaseModel):
    algorand_address: str
    reputation_score: float
    message: str = "Reputation score calculated successfully."

class IPFSUploadRequest(BaseModel):
    data: Dict[str, Any] # Can be any JSON data for metadata

class IPFSUploadResponse(BaseModel):
    ipfs_hash: str
    message: str = "Data uploaded to IPFS successfully."

class IPFSRetrieveResponse(BaseModel):
    data: Dict[str, Any]
    message: str = "Data retrieved from IPFS successfully."

class DaoVoteRequest(BaseModel):
    voter_address: str
    proposal_id: str
    vote_power: float # This would typically be derived from reputation score

class DaoProposal(BaseModel):
    id: str
    title: str
    description: str
    min_reputation_required: float
    current_votes: Dict[str, float] = {} # Address -> vote_power

# --- AI Model Endpoints ---
@app.post("/ai/predict-reputation", response_model=ReputationPredictionResponse)
async def calculate_user_reputation(request: ReputationPredictionRequest):
    """
    Calculates a user's reputation score based on their Algorand transaction history.
    """
    try:
        # Fetch actual transaction data using the indexer client
        transactions_data = await fetch_transaction_data(request.algorand_address, indexer_client)

        # Predict reputation score using the AI model, passing the address for accurate feature extraction
        reputation_score = predict_reputation_score(transactions_data, request.algorand_address)

        return ReputationPredictionResponse(
            algorand_address=request.algorand_address,
            reputation_score=reputation_score
        )
    except Exception as e:
        import traceback
        traceback.print_exc() # Print full traceback for debugging
        raise HTTPException(status_code=500, detail=f"Failed to calculate reputation: {str(e)}")

# --- IPFS Endpoints ---
@app.post("/ipfs/upload", response_model=IPFSUploadResponse)
async def upload_data_to_ipfs(request: IPFSUploadRequest):
    """
    Uploads JSON data (e.g., NFT metadata, reputation proof) to IPFS.
    """
    try:
        ipfs_hash = await upload_to_ipfs(request.data)
        return IPFSUploadResponse(ipfs_hash=ipfs_hash)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload to IPFS: {str(e)}")

@app.get("/ipfs/retrieve/{ipfs_hash}", response_model=IPFSRetrieveResponse)
async def retrieve_data_from_ipfs(ipfs_hash: str):
    """
    Retrieves JSON data from IPFS using its hash.
    """
    try:
        data = await get_from_ipfs(ipfs_hash)
        return IPFSRetrieveResponse(data=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve from IPFS: {str(e)}")

# --- DAO Demo Endpoints (Placeholders) ---
# In a real app, proposals would be on-chain or in a database
dao_proposals: Dict[str, DaoProposal] = {
    "prop1": DaoProposal(
        id="prop1",
        title="Increase DApp Fees by 1%",
        description="A proposal to increase transaction fees to fund community grants.",
        min_reputation_required=70.0
    ),
    "prop2": DaoProposal(
        id="prop2",
        title="Allocate 500 ALGO for marketing campaign",
        description="A proposal to fund a new marketing initiative.",
        min_reputation_required=50.0
    )
}

@app.get("/dao/proposals", response_model=List[DaoProposal])
async def get_dao_proposals():
    """
    Retrieves a list of active DAO proposals.
    """
    return list(dao_proposals.values())

@app.post("/dao/vote")
async def cast_dao_vote(request: DaoVoteRequest):
    """
    Casts a vote on a DAO proposal based on reputation score.
    (This is a simplified backend logic; actual voting would be on-chain)
    """
    if request.proposal_id not in dao_proposals:
        raise HTTPException(status_code=404, detail="Proposal not found.")

    proposal = dao_proposals[request.proposal_id]

    try:
        # Fetch the user's *current* reputation score via the AI model
        user_reputation = predict_reputation_score(
            await fetch_transaction_data(request.voter_address, indexer_client),
            request.voter_address
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not retrieve user reputation for voting: {str(e)}")

    if user_reputation < proposal.min_reputation_required:
         raise HTTPException(status_code=403, detail=f"Insufficient reputation score ({user_reputation:.2f}) to vote on this proposal (requires {proposal.min_reputation_required:.2f}).")

    # Record the vote (simplified, in-memory)
    proposal.current_votes[request.voter_address] = request.vote_power
    return {"message": f"Vote cast for proposal {request.proposal_id} by {request.voter_address} with power {request.vote_power:.2f}"}

# --- Health Check ---
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "ARS Backend is running"}

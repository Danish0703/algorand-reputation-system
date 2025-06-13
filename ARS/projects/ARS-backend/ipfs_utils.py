import os
import json
import requests
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env

PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

if not PINATA_API_KEY or not PINATA_SECRET_API_KEY:
    raise ValueError("PINATA_API_KEY and PINATA_SECRET_API_KEY environment variables must be set.")

async def upload_to_ipfs(data: dict) -> str:
    """
    Uploads JSON data to IPFS via Pinata.
    """
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    headers = {
        "Content-Type": "application/json",
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY,
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status() # Raise an exception for bad status codes

        ipfs_hash = response.json().get("IpfsHash")
        if not ipfs_hash:
            raise Exception("IPFS hash not found in Pinata response.")

        print(f"Uploaded to IPFS: {ipfs_hash}")
        return ipfs_hash
    except requests.exceptions.RequestException as e:
        print(f"Error uploading to IPFS: {e}")
        raise

async def get_from_ipfs(ipfs_hash: str) -> dict:
    """
    Retrieves JSON data from IPFS using its hash.
    """
    # Using a public IPFS gateway; replace with your preferred gateway if needed
    url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"

    try:
        response = requests.get(url)
        response.raise_for_status() # Raise an exception for bad status codes

        data = response.json()
        print(f"Retrieved from IPFS: {ipfs_hash}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error retrieving from IPFS: {e}")
        raise
    except json.JSONDecodeError:
        print(f"Could not decode JSON from IPFS hash: {ipfs_hash}")
        raise ValueError("Invalid JSON data retrieved from IPFS.")

from algokit_utils import get_algod_client
from smart_contracts.alg_rs_client import AlgRsClient  # Adjust to your generated name

def main():
    algod = get_algod_client()
    client = AlgRsClient(algod)  # This class must match the one in your _client.py file
    client.deploy()

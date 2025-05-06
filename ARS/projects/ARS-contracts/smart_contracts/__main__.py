# smart_contracts/alg_rs/__main__.py

from algopy import algod_client, get_private_key
from algopy.deployment import deploy_contract
from contract import ReputationContract

def main():
    client = algod_client()  # Uses default sandbox or localnet config
    creator = get_private_key()  # From environment variable
    contract = ReputationContract()

    app_id = deploy_contract(contract, client, creator)
    print(f"Deployed ReputationContract with App ID: {app_id}")

if __name__ == "__main__":
    main()

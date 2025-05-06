# tests/alg_rs_test.py

import pytest
from algopy import algod_client, get_private_key
from algopy.deployment import deploy_contract
from smart_contracts.alg_rs.contract import ReputationContract

@pytest.fixture
def setup_contract():
    client = algod_client()
    creator = get_private_key()
    contract = ReputationContract()
    app_id = deploy_contract(contract, client, creator)
    return contract, client, creator, app_id

def test_reputation_flow(setup_contract):
    contract, client, creator, app_id = setup_contract

    # Step 1: Bootstrap with dummy NFT ID and threshold
    contract.bootstrap(123456, 80).send(client, creator)

    # Step 2: Set score for a user
    user_address = creator.address  # Use same account for test
    contract.set_score(user_address, 90).send(client, creator)

    # Step 3: Confirm is_reputable returns true
    result = contract.is_reputable(user_address).call(client)
    assert result.return_value == True

    # Step 4: Mint NFT
    contract.mint_nft().send(client, creator)

    # Step 5: Check NFT balance (has_nft should be True)
    has_nft = contract.has_nft(user_address).call(client)
    assert has_nft.return_value == True

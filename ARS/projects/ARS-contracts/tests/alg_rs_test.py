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


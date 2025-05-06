# tests/alg_rs_test.py

import pytest
from algopy import algod_client, get_private_key
from algopy.deployment import deploy_contract
from smart_contracts.alg_rs.contract import ReputationContract


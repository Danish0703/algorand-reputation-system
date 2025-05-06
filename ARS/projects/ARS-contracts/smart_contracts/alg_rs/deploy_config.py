# smart_contracts/alg_rs/deploy_config.py

from algopy import ARC4Contract
from .contract import ReputationContract

def get_contract() -> ARC4Contract:
    return ReputationContract()

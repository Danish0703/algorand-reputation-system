# smart_contracts/alg_rs/contract.py

from algopy import ARC4Contract, abi, GlobalStateValue, itxn, gtxn
from algopy.arc4 import arc4

class ReputationContract(ARC4Contract):
    # Global states
    reputation_scores: GlobalStateValue[abi.Uint64]
    soulbound_nft_id: GlobalStateValue[abi.Uint64]

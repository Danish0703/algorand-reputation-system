# smart_contracts/alg_rs/contract.py

from algopy import ARC4Contract, abi, GlobalStateValue, itxn, gtxn
from algopy.arc4 import arc4

class ReputationContract(ARC4Contract):
    # Global states
    reputation_scores: GlobalStateValue[abi.Uint64]
    soulbound_nft_id: GlobalStateValue[abi.Uint64] 

    def __init__(self):
        self.reputation_scores = GlobalStateValue 
        self.soulbound_nft_id = GlobalStateValue 

    @arc4.abimethod
    def bootstrap(self, nft_id: abi.Uint64) -> abi.String:
        self.soulbound_nft_id.set(nft_id)
        return "Reputation contract initialized"

    @arc4.abimethod
    def get_score(self, address: abi.Address) -> abi.Uint64:
        return self.app.state.get(address, abi.Uint64(0))


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

    @arc4.abimethod
    def set_score(self, address: abi.Address, score: abi.Uint64) -> abi.String:
        assert self.sender == self.creator, "Only creator can set scores"
        self.app.state.set(address, score)
        return "Score updated"

    @arc4.abimethod
    def has_nft(self, address: abi.Address) -> abi.Bool:
        # Check asset balance inner logic here
        nft_id = self.soulbound_nft_id.get()
        holding = AssetHolding.balance(address, nft_id)
        return holding.value > 0

    @arc4.abimethod
    def mint_nft(self) -> abi.String:
        user = self.sender
        score = self.app.state.get(user, abi.Uint64(0))
        threshold = self.reputation_threshold.get()

        assert score >= threshold, "Insufficient reputation to mint NFT"

        nft_id = self.soulbound_nft_id.get()
        itxn.asset_transfer(
            xfer_asset=nft_id,
            asset_receiver=user,
            asset_amount=1
        ).submit()

        return "Soulbound NFT minted"
    
        threshold = self.reputation_threshold.get()

    @arc4.abimethod
    def revoke_nft(self, target: abi.Address) -> abi.String:
        assert self.sender == self.creator, "Only creator can revoke NFTs"

        nft_id = self.soulbound_nft_id.get()
        itxn.asset_transfer(
            xfer_asset=nft_id,
            asset_receiver=self.creator,
            asset_sender=target,
            asset_amount=1,
            asset_close_to=self.creator
        ).submit()

        return "NFT revoked"
    
    @arc4.abimethod
    def is_reputable(self, address: abi.Address) -> abi.Bool:
        score = self.app.state.get(address, abi.Uint64(0))
        threshold = self.reputation_threshold.get()
        return score >= threshold




from algopy import ARC4Contract, abi, GlobalStateValue, itxn, gtxn, Global, AssetHolding
from algopy.arc4 import arc4
from algopy.arc4.contract import ARC4Contract


class ReputationContract(ARC4Contract):
    soulbound_nft_id: GlobalStateValue[abi.Uint64]
    reputation_threshold: GlobalStateValue[abi.Uint64]
    reputation_scores: GlobalStateValue[abi.Address, abi.Uint64]
    score_update_count: GlobalStateValue[abi.Address, abi.Uint64]
    last_mint_time: GlobalStateValue[abi.Address, abi.Uint64]
    mint_cooldown_secs: GlobalStateValue[abi.Uint64]
    approved_delegates: GlobalStateValue[abi.Address, abi.Bool]  

    def __init__(self):
        self.soulbound_nft_id = GlobalStateValue()
        self.reputation_threshold = GlobalStateValue()
        self.reputation_scores = GlobalStateValue()
        self.score_update_count = GlobalStateValue()
        self.last_mint_time = GlobalStateValue()
        self.mint_cooldown_secs = GlobalStateValue()
        self.approved_delegates = GlobalStateValue()  

    @arc4.abimethod
    def bootstrap(self, nft_id: abi.Uint64, threshold: abi.Uint64, cooldown_secs: abi.Uint64) -> abi.String:
        self.soulbound_nft_id.set(nft_id)
        self.reputation_threshold.set(threshold)
        self.mint_cooldown_secs.set(cooldown_secs)
        return "Reputation contract initialized"

    @arc4.abimethod
    def get_score(self, address: abi.Address) -> abi.Uint64:
        return self.reputation_scores[address].get()

    @arc4.abimethod
    def set_score(self, address: abi.Address, score: abi.Uint64) -> abi.String:
        assert self.sender == self.creator, "Only creator can set scores"
        self.reputation_scores[address].set(score)

        count = self.score_update_count[address].get()
        self.score_update_count[address].set(count + 1)

        return "Score updated"

    @arc4.abimethod
    def get_score_update_count(self, address: abi.Address) -> abi.Uint64:
        return self.score_update_count[address].get()

    @arc4.abimethod
    def has_nft(self, address: abi.Address) -> abi.Bool:
        nft_id = self.soulbound_nft_id.get()
        holding = AssetHolding.balance(address, nft_id)
        return holding.value > 0

    @arc4.abimethod
    def mint_nft(self) -> abi.String:
        user = self.sender
        score = self.reputation_scores[user].get()
        threshold = self.reputation_threshold.get()
        assert score >= threshold, "Insufficient reputation to mint NFT"

        last_time = self.last_mint_time[user].get()
        cooldown = self.mint_cooldown_secs.get()
        now = Global.latest_timestamp()
        assert now >= last_time + cooldown, "Cooldown active"

        nft_id = self.soulbound_nft_id.get()
        itxn.asset_transfer(
            xfer_asset=nft_id,
            asset_receiver=user,
            asset_amount=1
        ).submit()

        self.last_mint_time[user].set(now)
        return "Soulbound NFT minted"

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
        score = self.reputation_scores[address].get()
        threshold = self.reputation_threshold.get()
        return score >= threshold

    # Creator can approve or revoke delegates
    @arc4.abimethod
    def approve_delegate(self, delegate: abi.Address, status: abi.Bool) -> abi.String:
        assert self.sender == self.creator, "Only creator can manage delegates"
        self.approved_delegates[delegate].set(status)
        return "Delegate approval updated"

    # Delegate can boost a user's reputation score
    @arc4.abimethod
    def delegate_boost(self, target: abi.Address, boost: abi.Uint64) -> abi.String:
        assert self.approved_delegates[self.sender].get(), "Not an approved delegate"
        score = self.reputation_scores[target].get()
        self.reputation_scores[target].set(score + boost)
        return "Reputation boosted"

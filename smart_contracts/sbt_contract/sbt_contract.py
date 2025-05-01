from algopy import ARC4Contract, arc4, itxn, Global

ZERO_ADDRESS = arc4.Address(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ")


class SoulboundNFTContract(ARC4Contract):
    """
    Soulbound NFT Smart Contract - Issues non-transferable (Soulbound) NFTs
    """

    @arc4.abimethod()
    def create_sbt(
        self,
        receiver: arc4.Address,
        name: arc4.String,
        reputation_score: arc4.Uint64,
        metadata_url: arc4.String,
    ) -> arc4.Uint64:
        """
        Create a new Soulbound NFT assigned to a receiver with a reputation score.
        """

        itxn.AssetConfig(
            total=1,
            decimals=0,
            default_frozen=False,
            unit_name="SBT",
            asset_name=name,
            url=metadata_url,
            manager=ZERO_ADDRESS,
            reserve=ZERO_ADDRESS,
            freeze=ZERO_ADDRESS,
            clawback=Global.current_application_address(),
        )

        return itxn.created_asset_id()

    @arc4.abimethod()
    def revoke_sbt(self, asset_id: arc4.Uint64, from_addr: arc4.Address) -> None:
        """
        Revoke (clawback) a Soulbound NFT from a user.
        """
        itxn.AssetTransfer(
            asset_id=asset_id,
            sender=from_addr,
            receiver=Global.current_application_address(),
            amount=1
        )

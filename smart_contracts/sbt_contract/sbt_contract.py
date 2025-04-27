from algopy import ARC4Contract, arc4, itxn, Txn, Global, AssetConfigTxn

ZERO_ADDRESS = arc4.Address("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ")

class SoulboundNFTContract(ARC4Contract):
    """
    Soulbound NFT + Reputation Score Smart Contract
    """

    @arc4.abimethod()
    def create_sbt(self, receiver: arc4.Address, name: arc4.String, reputation_score: arc4.Uint64) -> arc4.Uint64:
        """
        Create a new Soulbound NFT assigned to a receiver with a reputation score.
        """

        asset_name = name
        unit_name = "SBT"
        url = arc4.String(f"ipfs://your-ipfs-cid-or-metadata-link")
        
        # Create the ASA
        itxn.AssetConfig(
            total=1,
            decimals=0,
            default_frozen=False,
            unit_name=unit_name,
            asset_name=asset_name,
            url=url,
            manager=ZERO_ADDRESS,
            reserve=ZERO_ADDRESS,
            freeze=ZERO_ADDRESS,
            clawback=Global.current_application_address(),  # Contract can revoke
        )

        return itxn.created_asset_id()

    @arc4.abimethod()
    def revoke_sbt(self, asset_id: arc4.Uint64, receiver: arc4.Address) -> None:
        """
        Revoke Soulbound NFT if needed.
        """
        itxn.AssetTransfer(
            asset_id=asset_id,
            receiver=Global.current_application_address(),
            amount=1,
            sender=receiver
        )

    @arc4.abimethod()
    def update_reputation(self, asset_id: arc4.Uint64, new_reputation: arc4.Uint64) -> None:
        """
        Dummy function to simulate updating the reputation score.
        Metadata off-chain should be updated separately.
        """
        # No real metadata update on-chain for ASA
        pass

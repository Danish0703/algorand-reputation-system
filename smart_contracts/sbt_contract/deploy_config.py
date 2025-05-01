from sbt_contract import SoulboundNFTContract


def get_deploy_config():
    return dict(
        app_name="SoulboundNFTApp",
        approval_program=SoulboundNFTContract.approval_program(),
        clear_program=SoulboundNFTContract.clear_program(),
        global_schema=dict(
            num_uints=0,
            num_byte_slices=0,
        ),
        local_schema=dict(
            num_uints=0,
            num_byte_slices=0,
        ),
        extra_pages=1,  # In case the contract size needs extra space
        app_args=[],
    )


def get_deploy_config():
    return dict(
        app_name="SoulboundNFTApp",
        approval_program=SoulboundNFTContract.approval_program(),
        clear_program=SoulboundNFTContract.clear_program(),
        global_schema=dict(
            num_uints=0,
            num_byte_slices=0,
        ),
        local_schema=dict(
            num_uints=0,
            num_byte_slices=0,
        ),
        extra_pages=1,  # In case the contract size needs extra space
        app_args=[],
    )

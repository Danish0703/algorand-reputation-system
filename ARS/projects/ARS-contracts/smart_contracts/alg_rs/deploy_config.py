# smart_contracts/alg_rs/deploy_config.py

from algokit_utils.config import DeploymentConfig

class DeployConfig(DeploymentConfig):
    def get_deployment_name(self):
        return "reputation-contract"

    def get_app_spec(self):
        from .contract import ReputationContract
        return ReputationContract().app_spec()

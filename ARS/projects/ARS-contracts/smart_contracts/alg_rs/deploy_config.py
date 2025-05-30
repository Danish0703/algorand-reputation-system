from algokit_utils.config import DeploymentConfig
class DeployConfig(DeploymentConfig):
    def get_deployment_name(self):
        return "contract.py"

    def get_app_spec(self):
        from .contract import ReputationContract
        return ReputationContract().app_spec()

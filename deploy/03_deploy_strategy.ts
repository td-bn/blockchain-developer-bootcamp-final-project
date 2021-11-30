import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const WETHGatewayAddress = "0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70";
const aWETHTokenAddress = "0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const controller = await get("Controller");
  console.log("Controller Address: ", controller.address);

  const aaveConnector = await get("AaveConnector");
  console.log("aaveConnector Address: ", aaveConnector.address);

  const vault = await get("Vault");
  console.log("vault Address: ", vault.address);

  await deploy("ETHStrategy", {
    from: deployer,
    args: [
      controller.address,
      aaveConnector.address,
      aWETHTokenAddress,
      WETHGatewayAddress,
      vault.address,
    ],
    log: true,
  });
};
export default func;
func.tags = ["Controller"];

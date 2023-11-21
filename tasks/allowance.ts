import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("allowance", "Show the allowance of the requested address")
  .addParam("token", "Token address")
  .addParam("address", "Сontract address")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const owner = await erc20Token.owner();
      const address = taskArgs.address;
      const allowance = await erc20Token.allowance(owner, address);

      const ethAllowance = hre.ethers.utils.formatEther(allowance);

      console.log(
        `Address ${address} has a allowance of ${ethAllowance} ERC20Token's `
      );
    }
  );

import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("balanceOf", "Show the token balance of the requested address")
  .addParam("token", "Token address")
  .addParam("address", "Сontract address ")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const address = taskArgs.address;
      const balance = await erc20Token.balanceOf(address);

      const ethBalance = hre.ethers.utils.formatEther(balance);

      console.log(
        `Address ${address} has a balance of ${ethBalance} ERC20Token's `
      );
    }
  );

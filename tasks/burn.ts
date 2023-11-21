import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("burn", "Burn tokens")
  .addParam("token", "Token address")
  .addParam("account", "Account to burn from")
  .addParam("amount", "Amount to burn")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const account = taskArgs.account;
      const amount = hre.ethers.utils.parseEther(taskArgs.amount);

      await erc20Token.burn(account, amount);

      const ethAmount = hre.ethers.utils.formatEther(amount);

      console.log(`Burned ${ethAmount} ERC20Token's from ${account}`);
    }
  );

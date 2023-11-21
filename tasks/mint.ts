import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("mint", "Mint new tokens")
  .addParam("token", "Token address")
  .addParam("account", "Recipient address")
  .addParam("amount", "Amount to mint")
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

      await erc20Token.mint(account, amount);

      const ethAmount = hre.ethers.utils.formatEther(amount);

      console.log(`Minted ${ethAmount} ERC20Token's to ${account}`);
    }
  );

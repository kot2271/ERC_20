import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("transfer", "Transfer tokens to the address")
  .addParam("token", "Token address")
  .addParam("to", "Recipient address")
  .addParam("amount", "Amount to transfer")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const addressTo = taskArgs.to;
      const amount = hre.ethers.utils.parseEther(taskArgs.amount);
      await erc20Token.transfer(addressTo, amount);

      const owner = await erc20Token.owner();
      const ethAmount = hre.ethers.utils.formatEther(amount);

      console.log(
        `From ${owner} transferred ${ethAmount} ERC20Token's to ${addressTo}`
      );
    }
  );

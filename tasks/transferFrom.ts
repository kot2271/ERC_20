import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("transferFrom", "Transfer tokens using allowance")
  .addParam("token", "Token address")
  .addParam("from", "Sender address")
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
      const from = taskArgs.from;
      const to = taskArgs.to;
      const amount = hre.ethers.utils.parseEther(taskArgs.amount);
      await erc20Token.transferFrom(from, to, amount);

      const ethAmount = hre.ethers.utils.formatEther(amount);

      console.log(
        `From ${from} transferred ${ethAmount} ERC20Token's to ${to}`
      );
    }
  );

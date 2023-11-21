import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("increaseAllowance", "Increase allowance")
  .addParam("token", "Token address")
  .addParam("spender", "Spender address")
  .addParam("addedValue", "Amount to increase")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const spender = taskArgs.spender;
      const addedValue = hre.ethers.utils.parseEther(taskArgs.addedValue);

      await erc20Token.increaseAllowance(spender, addedValue);

      const ethValue = hre.ethers.utils.formatEther(addedValue);

      console.log(
        `Increased allowance for ${spender} by ${ethValue} ERC20Token's`
      );
    }
  );

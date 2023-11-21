import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("decreaseAllowance", "Decrease allowance")
  .addParam("token", "Token address")
  .addParam("spender", "Spender address")
  .addParam("subtractedValue", "Amount to decrease")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const spender = taskArgs.spender;
      const subtractedValue = hre.ethers.utils.parseEther(
        taskArgs.subtractedValue
      );

      await erc20Token.decreaseAllowance(spender, subtractedValue);

      const ethValue = hre.ethers.utils.formatEther(subtractedValue);

      console.log(
        `Decreased allowance for ${spender} by ${ethValue} ERC20Token's`
      );
    }
  );

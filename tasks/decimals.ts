import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("decimals", "Get number of decimals")
  .addParam("token", "Token address")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );

      const decimals = await erc20Token.decimals();

      console.log(`ERC20Token decimals: ${decimals}`);
    }
  );

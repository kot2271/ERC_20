import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("name", "Get token name")
  .addParam("token", "Token address")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );

      const symbol = await erc20Token.name();

      console.log(`ERC20Token name: ${symbol}`);
    }
  );

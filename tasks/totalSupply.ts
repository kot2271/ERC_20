import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { ERC20Token } from "../typechain";

task("totalSupply", "Get total token supply")
  .addParam("token", "Token address")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const erc20Token: ERC20Token = <ERC20Token>(
        await hre.ethers.getContractAt("ERC20Token", taskArgs.token as string)
      );
      const totalSupply = await erc20Token.totalSupply();

      const ethTotalSupply = hre.ethers.utils.formatEther(totalSupply);

      console.log(`Total supply is ${ethTotalSupply} ERC20Token's`);
    }
  );

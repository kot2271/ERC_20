import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20Token } from "../../typechain";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const TOKEN_NAME = "ERC20Token";
const TOKEN_SYMBOL = "E20T";
const DECIMALS = 18;
const INITIAL_SUPPLY = 10;
const INITIAL_AMOUNT: BigNumber = ethers.utils.parseEther(
  INITIAL_SUPPLY.toString()
);

const ONE_ETHER: BigNumber = ethers.utils.parseEther("1");
const FIVE_ETHERS: BigNumber = ethers.utils.parseEther("5");

describe("ERC20Token contract unit tests", function () {
  let signers: SignerWithAddress[];
  let erc20Token: ERC20Token;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    owner = signers[0];
    user = signers[1];

    const erc20TokenFactory = await ethers.getContractFactory(TOKEN_NAME);
    erc20Token = await erc20TokenFactory
      .connect(owner)
      .deploy(TOKEN_NAME, TOKEN_SYMBOL, DECIMALS, INITIAL_SUPPLY);
  });

  describe("Initial params of contract", async () => {
    it("Initializes name, symbol and decimals correctly", async () => {
      expect(await erc20Token.name()).to.equal(TOKEN_NAME);
      expect(await erc20Token.symbol()).to.equal(TOKEN_SYMBOL);
      expect(await erc20Token.decimals()).to.equal(DECIMALS);
    });

    it("Should have the correct owner", async () => {
      expect(await erc20Token.owner()).to.equal(owner.address);
    });

    it("Should have the correct initial total supply", async () => {
      expect(await erc20Token.totalSupply()).to.equal(INITIAL_AMOUNT);
    });

    it("Should assign the total supply of tokens to the owner balance", async function () {
      const ownerBalance = await erc20Token.balanceOf(owner.address);
      expect(await erc20Token.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have the correct initial balance for the owner", async () => {
      expect(await erc20Token.balanceOf(owner.address)).to.equal(
        INITIAL_AMOUNT
      );
    });
  });

  describe("Contract logic", function () {
    describe("Allowance", function () {
      it("Should return the correct allowance", async function () {
        await erc20Token.connect(owner).approve(user.address, FIVE_ETHERS);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(FIVE_ETHERS);
      });
    });

    describe("increaseAllowance", function () {
      it("Should set allowance if it was 0", async function () {
        await erc20Token
          .connect(owner)
          .increaseAllowance(user.address, FIVE_ETHERS);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(FIVE_ETHERS);
      });

      it("Should increase existing allowance", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await erc20Token.increaseAllowance(user.address, ONE_ETHER);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(ONE_ETHER.mul(2));
      });
    });

    describe("decreaseAllowance", function () {
      it("Should decrease allowance", async function () {
        const halfEther = ethers.utils.parseEther("0.5");
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await erc20Token
          .connect(owner)
          .decreaseAllowance(user.address, halfEther);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(halfEther);
      });

      it("Should decrease existing allowance", async () => {
        await erc20Token.connect(owner).approve(user.address, FIVE_ETHERS);
        await erc20Token.decreaseAllowance(user.address, ONE_ETHER.mul(4));
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(ONE_ETHER);
      });

      it("Should set allowance to 0 if decreased amount equals balance", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await erc20Token.decreaseAllowance(user.address, ONE_ETHER);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(0);
      });

      it("Should revert if decreased allowance falls below 0", async () => {
        await expect(
          erc20Token.decreaseAllowance(user.address, ONE_ETHER)
        ).to.be.revertedWith("Decreased allowance below zero");
      });
    });

    describe("Transfer", async () => {
      it("Should transfer tokens between accounts", async () => {
        await erc20Token.transfer(user.address, ONE_ETHER);
        expect(await erc20Token.balanceOf(user.address)).to.equal(ONE_ETHER);
      });

      it("Should emit Transfer event on token transfer", async function () {
        await expect(erc20Token.transfer(user.address, ONE_ETHER))
          .to.emit(erc20Token, "Transfer")
          .withArgs(owner.address, user.address, ONE_ETHER);
      });

      it("Should revert if insufficient balance", async () => {
        const transferAmount = ethers.utils.parseUnits("100", DECIMALS);
        await expect(
          erc20Token.transfer(user.address, transferAmount)
        ).to.be.revertedWith("ERC20Token: Insufficient balance");
      });
    });

    describe("Approve", async () => {
      it("Should set allowance for spender", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(ONE_ETHER);
      });

      it("Should emit Approval event on approval", async () => {
        await expect(erc20Token.connect(owner).approve(user.address, ONE_ETHER))
          .to.emit(erc20Token, "Approval")
          .withArgs(owner.address, user.address, ONE_ETHER);
      });
    });

    describe("TransferFrom", async () => {
      it("Should transfer tokens using allowance", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await erc20Token
          .connect(user)
          .transferFrom(owner.address, user.address, ONE_ETHER);
        expect(await erc20Token.balanceOf(user.address)).to.equal(ONE_ETHER);
      });

      it("Should decrease allowance after transfer", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await erc20Token
          .connect(user)
          .transferFrom(owner.address, user.address, ONE_ETHER);
        expect(
          await erc20Token.allowance(owner.address, user.address)
        ).to.equal(0);
      });

      it("Should revert if transfer amount exceeds allowance", async () => {
        await erc20Token.connect(owner).approve(user.address, ONE_ETHER);
        await expect(
          erc20Token
            .connect(user)
            .transferFrom(owner.address, user.address, FIVE_ETHERS)
        ).to.be.revertedWith("Transfer amount exceeds allowance");
      });

      it("Should revert if transfer amount exceeds balance", async () => {
        // First, mint some tokens to the owner
        await erc20Token.mint(owner.address, ethers.utils.parseEther("1000"));
        // Then, approve user to spend more tokens than the owner has
        await erc20Token
          .connect(owner)
          .approve(user.address, ethers.utils.parseEther("2000"));
        // Now, attempt to transfer more tokens than the owner has from the owner to user
        await expect(
          erc20Token
            .connect(user)
            .transferFrom(
              owner.address,
              user.address,
              ethers.utils.parseEther("2000")
            )
        ).to.be.revertedWith("Transfer amount exceeds balance");
      });
    });
    describe("Mint", async () => {
      it("Should mint tokens to specified account", async () => {
        await erc20Token.connect(owner).mint(user.address, ONE_ETHER);
        expect(await erc20Token.balanceOf(user.address)).to.equal(ONE_ETHER);
      });

      it("Should increase total supply on mint", async () => {
        const totalSupplyBefore = await erc20Token.totalSupply();
        await erc20Token.connect(owner).mint(user.address, ONE_ETHER);
        const totalSupplyAfter = await erc20Token.totalSupply();
        expect(totalSupplyAfter).to.equal(totalSupplyBefore.add(ONE_ETHER));
      });

      it("Should revert if called by non-owner", async () => {
        await expect(
          erc20Token.connect(user).mint(user.address, ONE_ETHER)
        ).to.be.revertedWith("Only the contract owner can call this function");
      });
    });

    describe("Burn", async () => {
      it("Should burn tokens from specified account", async () => {
        await erc20Token.connect(owner).mint(user.address, ONE_ETHER);
        await erc20Token.connect(owner).burn(user.address, ONE_ETHER);
        expect(await erc20Token.balanceOf(user.address)).to.equal(0);
      });

      it("Should decrease total supply on burn", async () => {
        await erc20Token.connect(owner).mint(user.address, ONE_ETHER);
        const totalSupplyBefore = await erc20Token.totalSupply();
        await erc20Token.connect(owner).burn(user.address, ONE_ETHER);
        const totalSupplyAfter = await erc20Token.totalSupply();
        expect(totalSupplyAfter).to.equal(totalSupplyBefore.sub(ONE_ETHER));
      });

      it("Should revert if burn amount exceeds balance", async () => {
        await expect(
          erc20Token
            .connect(owner)
            .burn(owner.address, INITIAL_AMOUNT.add(ONE_ETHER))
        ).to.be.revertedWith("Burn amount exceeds balance");
      });

      it("Should revert if called by non-owner", async () => {
        await expect(
          erc20Token.connect(user).burn(user.address, ONE_ETHER)
        ).to.be.revertedWith("Only the contract owner can call this function");
      });
    });
  });
});

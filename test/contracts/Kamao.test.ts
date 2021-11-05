import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, BigNumber } from "ethers";
import { getAaveConnectorInstance, getKamaoInstance } from "../utils/instances";
import { ONE_ETH } from "../utils/ethers";

describe("Kamao", function () {
  let instance: any;
  let user: Signer;
  let aaveConnector: any;
  let contractAddress: any;

  before(async () => {
    aaveConnector = await getAaveConnectorInstance();
    instance = await getKamaoInstance(aaveConnector);
    [user] = await ethers.getSigners();
    contractAddress = instance.address;
  });

  describe("deployement", () => {
    it("should be deployed to a non-zero address", async function () {
      expect(instance.address).not.to.equal(ethers.constants.AddressZero);
    });
  });

  describe("User deposit", () => {
    it("should increase the balance of user on successful deposits", async () => {
      await expect(instance.connect(user).deposit({ value: ONE_ETH }))
        .to.emit(instance, "Deposit")
        .withArgs(user.getAddress, ONE_ETH);

      expect(await instance.connect(user).getBalance()).equals(ONE_ETH);
    });
  });

  describe("Providing liquidity to Aave lending pool", async () => {
    it("should deposit into Aave and receive aWETH", async () => {
      const balanceBefore = await aaveConnector.getaWETHBalance(
        contractAddress
      );
      await instance.connect(user).provideLiquidity();
      const balanceAfter = await aaveConnector.getaWETHBalance(contractAddress);
      expect(balanceAfter.gt(BigNumber.from(0)));
      expect(balanceAfter.gt(balanceBefore));
    });
  });

  describe("Removing liquidity from Aave", () => {
    it("should get back the depositied ETH from Aave", async () => {
      const balanceBefore = await aaveConnector.getaWETHBalance(
        contractAddress
      );

      await instance.connect(user).withdrawLiquidity(ONE_ETH);
      const balanceAfter = await aaveConnector.getaWETHBalance(contractAddress);
      expect(balanceAfter.lt(balanceBefore));
    });
  });
});

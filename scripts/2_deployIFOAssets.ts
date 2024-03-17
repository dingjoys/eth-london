import { BigNumber } from "ethers";
import { ethers } from "hardhat";

// require "ethers": "5.7.2",
async function main() {
    const IFOAssets = await ethers.getContractFactory(
        "IFOAsset"
    );
    const assets1 = await IFOAssets.deploy("First Token", "FIRST",
        "1000000000000000", "2000000000000000");
    await assets1.deployed();
    const address1 = assets1.address;
    console.log(`asset1 deployed to ${address1}`);

    try {
        await assets1.swap({ value: "2000000000000000" });
        console.log("swapped unverified")

        await assets1.swap({ value: "1000000000000000" });
        console.log("swapped verified")
    } catch (e) {
        console.log("verified swap failed")
    }
    const assets2 = await IFOAssets.deploy("Second Token", "SECOND",
        "500000000000000", "1000000000000000");
    await assets2.deployed();
    const address2 = assets2.address;
    console.log(`asset2 deployed to ${address2}`);
    const assets3 = await IFOAssets.deploy("Third Token", "THIRD",
        "100000000000000", "200000000000000");
    await assets3.deployed();
    const address3 = assets3.address;
    console.log(`asset3 deployed to ${address3}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
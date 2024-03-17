import { BigNumber } from "ethers";
import { ethers } from "hardhat";

// require "ethers": "5.7.2",
async function main() {
	const MetobadgeContract = await ethers.getContractFactory(
		"MetoBadge"
	);
	const metobadge = await MetobadgeContract.deploy();
	await metobadge.deployed();
	const address = metobadge.address;
	console.log(`badge nft deployed to ${address}`);

	await metobadge.mintTo("0x622ee91C3b4841C54670120948Cd91c2603353A2", "0x559527a6D82Ac336821F2082c1cda49A4eB63588",
		1);
	console.log("minted")

	const validationResult = await metobadge.validate("0x559527a6D82Ac336821F2082c1cda49A4eB63588", 1);
	console.log("validation result", validationResult.toString());

	const svg = await metobadge.generateSVG(BigNumber.from("0x559527a6D82Ac336821F2082c1cda49A4eB63588").toString())
	console.log("image", svg)
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
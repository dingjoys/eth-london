import { ethers } from "hardhat";

async function main() {
	const MetobadgeContract = await ethers.getContractFactory(
		"MetoBadge"
	);
	const metobadge = await MetobadgeContract.deploy();
	await metobadge.deployed();
	// require "ethers": "5.7.2",
	const address = metobadge.address;
	console.log(`badge nft deployed to ${address}`);

	await metobadge.mintTo("0x622ee91C3b4841C54670120948Cd91c2603353A2", "0x622ee91C3b4841C54670120948Cd91c2603353A2",
		"0x0000000000000000000000000000000000000000000000000000000000000001");
	console.log("minted")
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
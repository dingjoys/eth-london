import { ethers } from "ethers"

const abi = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner_",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "proxy",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
        }
    ],
    "name": "mintTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

export const mintBadgeTo = async () => {

    const provider = new ethers.JsonRpcProvider("https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/")
    const deployerSigner = new ethers.Wallet("e8bf34d06d398fa2998c1ec84e7e139f920d256eb43f20e8a9939f35f214bd7c", provider)



}

export const updateCredential = async () => {

}
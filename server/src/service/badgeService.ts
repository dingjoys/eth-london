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



export const getContract = (contractAddress, abi, providerOrSigner) => {
    return new ethers.Contract(contractAddress, abi, providerOrSigner);
};

export const mintBadgeTo = async (owner, credentialSymbol) => {
    const provider = new ethers.JsonRpcProvider("https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/")
    const deployerSigner = new ethers.Wallet("e8bf34d06d398fa2998c1ec84e7e139f920d256eb43f20e8a9939f35f214bd7c", provider)
    const contractAddr = "0x26aFc7a4E43D6bC70F4763b75F02805056a76cfc"
    try {
        const contractObj = getContract(contractAddr, abi, deployerSigner as any);
        await contractObj.mintTo(owner, owner, credentialSymbol)
    } catch (e) {

    }
}

export const updateCredential = async () => {

}
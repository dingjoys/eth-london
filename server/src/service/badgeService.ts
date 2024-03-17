import { ethers } from "ethers"

export const mintBadgeTo = async () => {
    
  const provider = new ethers.JsonRpcProvider("https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/")
  const deployerSigner = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
  

}

export const updateCredential = async () => {

}
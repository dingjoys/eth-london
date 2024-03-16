import { ethers } from "ethers";

export const getProvider = (chain: any) => {
    chain = parseInt(chain)
    if (chain == 84532) {
        return new ethers.JsonRpcProvider(
            "https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/"
        );
    }
    else {
        return undefined
    }
}
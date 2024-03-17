import { ethers } from "ethers";
import { getProvider } from "../../utils";
import { CredentialValidator } from ".";

const HOLONYM_V3_CONTRACT = "0x2aa822e264f8cc31a2b9c22f39e5551241e94dfb"
const HOLONYM_V3_PHONE_CURCUITID = "0xbce052cf723dca06a21bd3cf838bc518931730fb3db7859fc9cc86f0d5483495"
const HOLONYM_V3_GOVERNID_CURCUITID = "0x729d660e1c02e4e419745e617d643f897a538673ccf1051e093bbfa58b0a120b"
const HOLONYM_V3_ABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "sbtOwner",
            "type": "address"
        },
        {
            "internalType": "bytes32",
            "name": "circuitId",
            "type": "bytes32"
        }
    ],
    "name": "getSBT",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "uint256",
                    "name": "expiry",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "publicValues",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bool",
                    "name": "revoked",
                    "type": "bool"
                }
            ],
            "internalType": "struct SBT",
            "name": "sbt",
            "type": "tuple"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}]

const HOLONYM_V2_PHONE_CONTRACT = "0xe337ad5aa1cb84e12a7aab85aed1ab6cb44c4a8e"
const HOLONYM_V2_GOVERN_CONTRACT = "0x7a81f2f88b0ee30ee0927c9f672487689c6dd7ce"

const HOLONYM_V2_ABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}]

const isV3GovernerIdMinted = async (owner) => {
    try {
        const provider = await getProvider(10)
        let contractObj = new ethers.Contract(HOLONYM_V3_CONTRACT, HOLONYM_V3_ABI, provider)
        let result = await contractObj.getSBT(owner, HOLONYM_V3_GOVERNID_CURCUITID);
        return result?.toString().length > 0
    } catch (e) {
        console.log(e, 1)
        return false
    }
}

const isV3PhoneMinted = async (owner) => {
    try {
        const provider = await getProvider(10)
        let contractObj = new ethers.Contract(HOLONYM_V3_CONTRACT, HOLONYM_V3_ABI, provider)
        let result = await contractObj.getSBT(owner, HOLONYM_V3_PHONE_CURCUITID);
        console.log(2, result?.toString())
        return result?.length > 0
    } catch (e) {
        console.log(e, 2)
        return false
    }
}

const isV2GovernerIdMinted = async (owner) => {
    try {
        const provider = await getProvider(10)
        let contractObj = new ethers.Contract(HOLONYM_V2_GOVERN_CONTRACT, HOLONYM_V2_ABI, provider)
        let result = await contractObj.balanceOf(owner);
        console.log(3, result)
        return parseInt(result.toString()) > 0
    } catch (e) {
        console.log(e, 3)
        return false
    }
}

const isV2PhoneMinted = async (owner) => {
    try {
        const provider = await getProvider(10)
        let contractObj = new ethers.Contract(HOLONYM_V2_PHONE_CONTRACT, HOLONYM_V2_ABI, provider)
        let result = await contractObj.balanceOf(owner);
        console.log(4, result)
        return parseInt(result.toString()) > 0
    } catch (e) {
        console.log(e, 4)
        return false
    }
}

const isPhoneMinted = async (owner) => {
    try {
        let count = 0
        console.log("?", 5)
        await Promise.all([isV3PhoneMinted(owner), isV2PhoneMinted(owner)]).then(values => {
            console.log(values)
            for (let i = 0; i < values.length; i++) {
                if (values[i]) {
                    count++
                }
            }
        })
        return count
    } catch (e) {
        return 0
    }
}

const isGovernIdMinted = async (owner) => {
    let count = 0
    console.log("?", 6)
    await Promise.all([isV3GovernerIdMinted(owner), isV2GovernerIdMinted(owner)]).then(values => {
        console.log(values)
        for (let i = 0; i < values.length; i++) {
            if (values[i]) {
                count++
            }
        }
    }).catch(e => {
        return 0
    })
    return count
}

export const holonymValidator: CredentialValidator<"HOLONYM"> = async (params, owner) => {
    if (params.type == 'phone') {
        let value = await isPhoneMinted(owner);
        return value > 0
    } else {
        let value = await isGovernIdMinted(owner);
        return value > 0
    }
}
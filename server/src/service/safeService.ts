import { ethers, formatEther } from "ethers"
import { deploySafeWallet as deploySafeWallet } from "./safeSdk/deploy-safe"
import { mintBadgeTo } from "./badgeService"
import { IndexedCrendentials, getValidators } from "./validator"

const credentialKeys = ["Holonym", "Sent 1+ Transaction On Base"]

/**
 * require "ethers": "6.8.1",
 */

export type Account = {
    owners,
    safeAddress,
    safeBalance,
    credentials
}

const accountMap: any = {
}

/**
 * @param owner 
 * @returns hex string
 */
export const validate: (owners) => Promise<String> = async (owners) => {
    // let result = 3
    let result = 0
    if (owners?.length > 0) {

        for (let i = 0; i < IndexedCrendentials.length; i++) {
            let validator = getValidators(IndexedCrendentials[i])
            let flag = 0
            for (let j = 0; j < owners.length; j++) {
                if (await validator(owners[j])) {
                    flag = 1;
                }
            }
            result += Math.pow(2, i) * flag
        }
    }
    let hexString = result.toString(16);
    // Pad the hexadecimal string with zeros to ensure it's 32 bytes long
    while (hexString.length < 64) {
        hexString = "0" + hexString;
    }

    return "0x" + hexString;
}

export const credentialToAttributes = (symbol) => {
    const number = BigInt(symbol);
    let result = {}
    for (let i = 0; i < credentialKeys.length; i++) {
        let flag = (number & BigInt(1 << i)) > 0
        result[credentialKeys[i]] = flag
    }
    return result
}

export const getAccount = async (fid: string) => {
    let account = accountMap[fid]
    if (!account?.safeAddress) {
        return account
    }
    const provider = new ethers.JsonRpcProvider("https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/")
    const balance = await provider.getBalance(account.safeAddress);

    return Object.assign({ balance: formatEther(balance) }, account)
}

/**
 * the new account is stored in memory
 * @returns safe account 
 */
export const createAccount = async (fid, owners) => {
    let account = accountMap[fid]
    console.log(account)
    if (!account) {
        console.log("Creating account")
        try {
            let safeWalletAddress;
            deploySafeWallet(fid, owners).then(safeWalletAddress => {
                console.log("safeWalletAddress", safeWalletAddress)
                const account = {
                    owners: owners?.length ? owners.concat(["0x622ee91C3b4841C54670120948Cd91c2603353A2"]) : ["0x622ee91C3b4841C54670120948Cd91c2603353A2"],
                    safeAddress: safeWalletAddress,
                }
                accountMap[fid] = account

                return validate(owners).then(credentialSymbol => {
                    console.log("credentials", credentialSymbol)
                    const account = {
                        owners: owners?.length ? owners.concat(["0x622ee91C3b4841C54670120948Cd91c2603353A2"]) : ["0x622ee91C3b4841C54670120948Cd91c2603353A2"],
                        safeAddress: safeWalletAddress,
                        credentialSymbol,
                        credentials: credentialToAttributes(credentialSymbol),
                    }
                    accountMap[fid] = account
                    mintBadgeTo(safeWalletAddress, credentialSymbol)
                })
            }).catch(e => {
                validate(owners).then(credentialSymbol => {
                    console.log("credentials", credentialSymbol)
                    const account = {
                        owners: owners?.length ? owners.concat(["0x622ee91C3b4841C54670120948Cd91c2603353A2"]) : ["0x622ee91C3b4841C54670120948Cd91c2603353A2"],
                        safeAddress: safeWalletAddress,
                        credentialSymbol,
                        credentials: credentialToAttributes(credentialSymbol),
                    }
                    accountMap[fid] = account
                    mintBadgeTo(safeWalletAddress, credentialSymbol)
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    return account
}
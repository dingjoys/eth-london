import { ethers } from "ethers"
import { deploySafeWallet as deploySafeWallet } from "./safeSdk/deploy-safe"

const credentialKeys = ["Holonym"]

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
    let result = 1

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
    return account
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
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    return account
}
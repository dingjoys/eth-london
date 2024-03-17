import { deploySafeWallet as deploySafeWallet } from "./safeSdk/deploy-safe"

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

export const getAccount = async (fid: string, owners) => {
    let account = accountMap[fid.toLowerCase()]
    if (account) {
        
        return null
    } else {
        return account
    }
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
        deploySafeWallet(fid, owners).then(safeWalletAddress => {
            console.log("safeWalletAddress")
            return validate(owners).then(credentials => {
                console.log("credentials", credentials)
                const account = {
                    owners: [],
                    safeAddress: safeWalletAddress,
                    credentials: credentials,
                    safeBalance: ""
                }
                accountMap[fid] = account
            })
        })
    }

    return account
}
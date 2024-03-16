import { deploySafeWallet as deploySafeWallet } from "./safeSdk/deploy-safe"

/**
 * require "ethers": "6.8.1",
 */

export type Account = {
    owner,
    safeAddress,
    safeBalance,
    credentials
}

const accountMap: any = {
    "0x622ee91c3b4841c54670120948cd91c2603353a2": {
        owner: "0x622ee91c3b4841c54670120948cd91c2603353a2",
        safeAddress: "0x559527a6D82Ac336821F2082c1cda49A4eB63588",
        safeBalance: "",
        credentials: 1
    }
}


/**
 * @param owner 
 * @returns hex string
 */
export const validate: (owner) => Promise<String> = async (owner) => {
    let result = 1

    let hexString = result.toString(16);

    // Pad the hexadecimal string with zeros to ensure it's 32 bytes long
    while (hexString.length < 64) {
        hexString = "0" + hexString;
    }

    return "0x" + hexString;
}

export const getAccount = (owner: string) => {
    let account = accountMap[owner.toLowerCase()]
    return account
}

/**
 * the new account is stored in memory
 * @returns safe account 
 */
export const createAccount = async (_owner) => {
    let owner = _owner.toLowerCase()
    let account = accountMap[owner]
    if (!account) {
        const safeWalletAddress = await deploySafeWallet(owner);
        const credentials = await validate(owner);
        const account = {
            owner,
            safeAddress: safeWalletAddress,
            credentials: credentials,
            safeBalance: ""
        }
        accountMap[owner] = account
    }
    
    return account
}
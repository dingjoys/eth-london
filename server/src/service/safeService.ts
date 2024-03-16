import { deploySafeWallet as deploySafeWallet } from "./safeSdk/deploy-safe"

export type Account = {
    owner,
    safeAddress,
    balance,
    credentials
}

const accountMap: any = {

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
    const safeWalletAddress = await deploySafeWallet(owner);
    const credentials = await validate(owner);
    const account = {
        owner,
        safeAddress: safeWalletAddress,
        credentials: credentials
    }
    accountMap[owner] = account
    return account
}
import { OperationType, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTx } from "./safeSdk/propose-transaction"
import { getAccount } from "./safeService"
import { confirmSafeTx } from "./safeSdk/confirm-transaction"
import { executeSafeTx } from "./safeSdk/execute-transaction"

const methodId = "0x8119c065"
const abi = [{
    "inputs": [],
    "name": "swap",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}]

const tokenConfig = [
    {
        contract: "0x925995637033dFD0522D8021C1E1181d2Ee036cc",
        price: "200000000000000",
        verifiedPrice: "100000000000000",
    }, {
        contract: "0xB9FFAe79e9527847193DAf38CdC72B63939Ed21F",
        price: "50000000000000",
        verifiedPrice: "100000000000000",
    }, {
        contract: "0x87c30fb3Cf36c76058282B1513C98Bf338B3f239",
        price: "10000000000000",
        verifiedPrice: "20000000000000",
    },
]

export const swapInfo = (contractIndex) => {
    return tokenConfig[contractIndex - 1];
}

export const proxySwap = async (contractIndex, fid) => {
    let account = await getAccount(fid)
    if (!account?.safeAddress) {
        return
    }
    let safeTransactionData: SafeTransactionDataPartial =
        (account.credentials["Sent 1+ Transaction On Base"]) ? {
            // verified
            to: tokenConfig[contractIndex - 1].contract,
            value: tokenConfig[contractIndex - 1].verifiedPrice,
            data: methodId,
            operation: OperationType.Call
        } :
            // not verified
            {
                to: tokenConfig[contractIndex - 1].contract,
                value: tokenConfig[contractIndex - 1].price,
                data: methodId,
                operation: OperationType.Call
            };
    let safeTxHash = await proposeSafeTx(account.safeAddress, safeTransactionData);
    await confirmSafeTx(account.safeAddress, safeTxHash);
    await executeSafeTx(account.safeAddress, safeTxHash);
    return
}
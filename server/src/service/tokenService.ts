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
        contract: "0xf3BE781F433873CC7444c8Fb599EC120291e6E49",
        price: "2000000000000000",
        verifiedPrice: "1000000000000000",
    }, {
        contract: "0x3e8479c05EB90bAEF66b3624E5483D2dE156c29a",
        price: "500000000000000",
        verifiedPrice: "1000000000000000",
    }, {
        contract: "0x0a4628AF736d09006CcA6433DC2FD0a2069cf226",
        price: "100000000000000",
        verifiedPrice: "200000000000000",
    },
]
export const swapInfo = (contractIndex) => {
    return tokenConfig[contractIndex - 1];
}

export const proxySwap = async (contractIndex,  fid) => {
    let account = await getAccount(fid)
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
    let safeTxHash = await proposeSafeTx(account.safe, safeTransactionData);
    await confirmSafeTx(account.safe, safeTxHash);
    await executeSafeTx(account.safe, safeTxHash);
    return
}
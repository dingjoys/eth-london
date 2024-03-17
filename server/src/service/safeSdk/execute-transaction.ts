import SafeApiKit from '@safe-global/api-kit'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'

// This file can be used to play around with the Safe Core SDK

interface Config {
  CHAIN_ID: bigint
  RPC_URL: string
  SIGNER_ADDRESS_PRIVATE_KEY: string
  TX_SERVICE_URL: string
}

const config: Config = {
  CHAIN_ID: BigInt(84532),
  RPC_URL: "https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/",
  SIGNER_ADDRESS_PRIVATE_KEY: "e8bf34d06d398fa2998c1ec84e7e139f920d256eb43f20e8a9939f35f214bd7c",
  TX_SERVICE_URL: 'https://safe-transaction-goerli.safe.global/', // Check https://docs.safe.global/safe-core-api/available-services
}

export async function executeSafeTx(safeAddress, safeTxHash) {
  const provider = new ethers.JsonRpcProvider(config.RPC_URL)
  const signer = new ethers.Wallet(config.SIGNER_ADDRESS_PRIVATE_KEY, provider)

  // Create EthAdapter instance
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer
  } as any)

  // Create Safe instance
  const safe = await Safe.create({
    ethAdapter,
    safeAddress
  })

  // Create Safe API Kit instance
  const service = new SafeApiKit({
    chainId: config.CHAIN_ID
  })

  // Get the transaction
  const safeTransaction = await service.getTransaction(safeTxHash)

  const isTxExecutable = await safe.isValidTransaction(safeTransaction)

  if (isTxExecutable) {
    // Execute the transaction
    const txResponse = await safe.executeTransaction(safeTransaction)
    const contractReceipt = await txResponse.transactionResponse?.wait()

    console.log('Transaction executed.')
    console.log('- Transaction hash:', contractReceipt)
  } else {
    console.log('Transaction invalid. Transaction was not executed.')
  }
}

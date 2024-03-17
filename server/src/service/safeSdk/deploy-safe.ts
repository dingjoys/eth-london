import { EthersAdapter, SafeAccountConfig, SafeFactory, predictSafeAddress } from '@safe-global/protocol-kit'
import { SafeVersion } from '@safe-global/safe-core-sdk-types'
import { ethers } from 'ethers'

// This file can be used to play around with the Safe Core SDK

interface Config {
  RPC_URL: string
  DEPLOYER_ADDRESS_PRIVATE_KEY: string
  DEPLOY_SAFE: {
    OWNERS: string[]
    THRESHOLD: number
    SALT_NONCE: string
    SAFE_VERSION: string
  }
}

const getconfig: (fid, owners) => Config = (fid, owners) => ({
  RPC_URL: 'https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/',
  DEPLOYER_ADDRESS_PRIVATE_KEY: "e8bf34d06d398fa2998c1ec84e7e139f920d256eb43f20e8a9939f35f214bd7c",
  DEPLOY_SAFE: {
    OWNERS: owners?.length ? owners.concat(["0x622ee91C3b4841C54670120948Cd91c2603353A2"]) : ["0x622ee91C3b4841C54670120948Cd91c2603353A2"],
    THRESHOLD: 1,
    SALT_NONCE: fid,
    SAFE_VERSION: '1.4.1'
  }
})

export async function deploySafeWallet(fid, owners) {
  const config = getconfig(fid, owners)
  console.log(config)
  const provider = new ethers.JsonRpcProvider(config.RPC_URL)
  const deployerSigner = new ethers.Wallet(config.DEPLOYER_ADDRESS_PRIVATE_KEY, provider)

  // Create EthAdapter instance
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: deployerSigner
  } as any)

  const safeVersion = config.DEPLOY_SAFE.SAFE_VERSION as SafeVersion

  console.log('safe config: ', config.DEPLOY_SAFE)

  // Create SafeFactory instance
  const safeFactory = await SafeFactory.create({ ethAdapter, safeVersion })

  // Config of the deployed Safe
  const safeAccountConfig: SafeAccountConfig = {
    owners: config.DEPLOY_SAFE.OWNERS,
    threshold: config.DEPLOY_SAFE.THRESHOLD
  }
  const saltNonce = config.DEPLOY_SAFE.SALT_NONCE

  // Predict deployed address
  const predictedDeploySafeAddress = await safeFactory.predictSafeAddress(
    safeAccountConfig,
    saltNonce
  )

  console.log('Predicted deployed Safe address:', predictedDeploySafeAddress)

  function callback(txHash: string) {
    console.log('Transaction hash:', txHash)
  }

  // Deploy Safe
  try {
    const safe = await safeFactory.deploySafe({
      safeAccountConfig,
      saltNonce,
      callback
    })
    console.log('Deployed Safe:', await safe.getAddress())
  } catch (e) {
    console.error(e)
  }


  return predictedDeploySafeAddress
}


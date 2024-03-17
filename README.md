Repo of Frames: https://github.com/dingjoys/smart-account-frame-template 

Demo: https://warpcast.com/~/developers/frames?url=https%3A%2F%2Flondon.metopia.xyz%2F

Enable onchain interactions on Warpcast through Safe Wallet, along with the humanity attestation as additive identity information behind the wallet. A token sale example is provided as an application.

# contract

Set up Credential Contract
```
npx hardhat run --network basesepolia scripts/1_deployBadge.ts
```

Modify IFOAsset.sol credential contract address config and deploy application examples
```
npx hardhat run --network basesepolia scripts/2_deployIFOAssets.ts
```

# run the server

the test private key is coded in the file which should be replaced
```
yarn run start-service
```

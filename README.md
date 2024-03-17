Another repo: https://github.com/dingjoys/smart-account-frame-template 

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

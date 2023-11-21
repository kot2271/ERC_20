# ERC20Token

[![Mumbai](https://img.shields.io/badge/check_the_contract_in_mumbai.polygonscan-9966cc?style=flat&logo=ethereum)](https://mumbai.polygonscan.com/address/0x60EA3A51E59520b508C9F1EfaeDA0a8CcFbE3C53)

## Installation

Clone the repository using the following command:
Install the dependencies using the following command:
```shell
npm i
```

## Deployment

Fill in all the required environment variables(copy .env-example to .env and fill it). 

Deploy contract to the chain (polygon-mumbai):
```shell
npx hardhat run scripts/deploy/deploy.ts --network polygonMumbai
```

## Verify

Verify the installation by running the following command:
```shell
npx hardhat verify --network polygonMumbai {CONTRACT_ADDRESS}
```

## Tasks

Create a new task(s) and save it(them) in the folder "tasks". Add a new task_name in the file "tasks/index.ts"

Running a owner task:
```shell
npx hardhat owner --token {TOKEN_ADDRESS} --network polygonMumbai
```

Running a name task:
```shell
npx hardhat name --token {TOKEN_ADDRESS} --network polygonMumbai
```

Running a symbol task:
```shell
npx hardhat symbol --token {TOKEN_ADDRESS} --network polygonMumbai
```

Running a decimals task:
```shell
npx hardhat decimals --token {TOKEN_ADDRESS} --network polygonMumbai
```

Running a totalSupply task:
```shell
npx hardhat totalSupply --token {TOKEN_ADDRESS} --network polygonMumbai
```

Running a transfer task:
```shell
npx hardhat transfer --token {TOKEN_ADDRESS} --to {RECIPIENT_ADDRESS} --amount {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a balanceOf task:
```shell
npx hardhat balanceOf --token {TOKEN_ADDRESS} --address {CONTRACT_ADDRESS} --network polygonMumbai
```

Running a approve task:
```shell
npx hardhat approve --token {TOKEN_ADDRESS} --spender {SPENDER_ADDRESS} --amount {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a allowance task:
```shell
npx hardhat allowance --token {TOKEN_ADDRESS} --address {CONTRACT_ADDRESS} --network polygonMumbai
```

Running a transferFrom task:
```shell
npx hardhat transferFrom --token {TOKEN_ADDRESS} --from {SENDER_ADDRESS} --to {RECIPIENT_ADDRESS} --amount {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a increaseAllowance task:
```shell
npx hardhat increaseAllowance --token {TOKEN_ADDRESS} --spender {SPENDER_ADDRESS} --added-value {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a decreaseAllowance task:
```shell
npx hardhat decreaseAllowance --token {TOKEN_ADDRESS} --spender {SPENDER_ADDRESS} --subtracted-value {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a mint task:
```shell
npx hardhat mint --token {TOKEN_ADDRESS} --account {RECIPIENT_ADDRESS} --amount {AMOUNT_IN_ETHER} --network polygonMumbai
```

Running a burn task:
```shell
npx hardhat burn --token {TOKEN_ADDRESS} --account {RECIPIENT_ADDRESS} --amount {AMOUNT_IN_ETHER} --network polygonMumbai
```
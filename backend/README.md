# empanada.rocks

## 1 - Install dependencies:

```sh
yarn
```

## 2 - Rename `.env.template` to `.env` and edit its content:

- NAME
- SYMBOL
- BASEURI
- MAXSUPPLY

## 3 - Run a local Ethereum node:

```sh
npx hardhat node
```

## 4 - Deploy the smart contract to the local node:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

### the previous command should have printed out the deployed contract address

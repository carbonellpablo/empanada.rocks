const { name, symbol, baseURI, maxSupply } = require("../config.js");
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTfactory = await hre.ethers.getContractFactory("NFTfactory");
  const contract = await NFTfactory.deploy(name, symbol, baseURI, maxSupply);
  await contract.deployed();
  console.log("NFT factory for " + name + " deployed to:", contract.address);
  await hre.ethernal.push({
    name: "NFTfactory",
    address: contract.address,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

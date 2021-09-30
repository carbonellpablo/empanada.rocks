
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: '../frontend/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
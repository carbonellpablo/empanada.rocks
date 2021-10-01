require("@nomiclabs/hardhat-waffle");
require("hardhat-ethernal");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

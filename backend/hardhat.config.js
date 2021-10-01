require("@nomiclabs/hardhat-waffle");
require("hardhat-ethernal");
const { deploy } = require("./config.js");
const { rinkeby_alchemy__api_key, rinkeby_private_key } = deploy;

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
    rinkeby: {
      url: `${rinkeby_alchemy__api_key}`,
      accounts: [`0x${rinkeby_private_key}`],
    },
  },
};

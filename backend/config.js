require("dotenv").config();

module.exports = {
  name: process.env.NAME,
  symbol: process.env.SYMBOL,
  baseURI: process.env.BASEURI,
  maxSupply: process.env.MAXSUPPLY,
  deploy: {
    rinkeby_alchemy__api_key: process.env.RINKEBY_ALCHEMY_API_KEY,
    rinkeby_private_key: process.env.RINKEBY_PRIVATE_KEY,
  },
};

require("dotenv").config();

module.exports = {
  name: process.env.NAME,
  symbol: process.env.SYMBOL,
  baseURI: process.env.BASEURI,
  maxSupply: process.env.MAXSUPPLY,
};

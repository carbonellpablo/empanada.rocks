import contract from './artifacts/contracts/NFTfactory.sol/NFTfactory.json';
const { abi }: any = contract;

const NFTfactory = {
  address: process.env.REACT_APP_NFT_FACTORY_DEPLOYED_ADDRESS as string,
  abi,
};

export { NFTfactory };

import { useState } from 'react';
import './App.css';
import { ethers, Contract } from 'ethers';
import { NFTfactory } from './config';
import Loading from './components/Loading/Loading';

async function getBalance(
  address: string,
  contract: Contract
): Promise<number> {
  const balance = await contract.balanceOf(address);

  return balance.toNumber();
}

async function getTokenIdByAccount(
  address: string,
  contract: Contract
): Promise<number> {
  const balance = await getBalance(address, contract);

  if (balance > 0) {
    const tokenIdByOwnerinHex = await contract.tokenOfOwnerByIndex(address, 0);

    return tokenIdByOwnerinHex.toNumber();
  }

  return 0;
}

async function isThereSupplyLeft(contract: Contract): Promise<boolean> {
  const supplyInHex = await contract.totalSupply();
  const supplyInNumber = supplyInHex.toNumber();

  return supplyInNumber < 12;
}

async function mint(address: string, contract: Contract): Promise<number> {
  const safeMint = await contract.safeMint();

  await safeMint.wait();

  return getTokenIdByAccount(address, contract);
}

function App(): JSX.Element {
  const [tokenId, setTokenId] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [contractInfo, setContractInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [supplyLeft, setSupplyLeft] = useState<boolean>(true);
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    getEmpanada();
  };
  const handleInfoClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      NFTfactory.address,
      NFTfactory.abi,
      signer
    );
    const info = {
      contractInfo: {
        address: NFTfactory.address,
        name: await contract.name(),
        symbol: await contract.symbol(),
        owner: await contract.owner(),
        baseURI: await contract.baseURI(),
        leftToMint: 12 - (await contract.totalSupply()),
      },
    };

    setContractInfo(info);
    setLoading(false);
  };

  async function getEmpanada() {
    setLoading(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          NFTfactory.address,
          NFTfactory.abi,
          signer
        );

        const account = await signer.getAddress();

        const prevTokenID = await getTokenIdByAccount(account, contract);
        const NFTleft = await isThereSupplyLeft(contract);
        const tempTokenId =
          prevTokenID === 0 && NFTleft
            ? await mint(account, contract)
            : prevTokenID;

        setSupplyLeft(NFTleft);
        setTokenId(tempTokenId);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
      //eslint-disable-next-line
      console.error(e);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <h1>empanada.rocks</h1>
      <h2>An NFT collection featuring 12 empanadas</h2>
      <img src="./base.png" width="400px" height="400px" />

      {tokenId === 0 && supplyLeft ? (
        <button onClick={handleClick}>Get your free Empanada!</button>
      ) : tokenId > 0 ? (
        <p>
          Congratulations! You own the Empanada #{tokenId}.
          <a
            href={`https://testnets.opensea.io/assets/${NFTfactory.address}/${tokenId}`}
          >
            You can check it here
          </a>
        </p>
      ) : (
        <p>Sorry! there are no empanadas left!</p>
      )}
      <button onClick={handleInfoClick}>Print contract info</button>
      {contractInfo ? <pre>{JSON.stringify(contractInfo, null, 2)}</pre> : null}
      {error ? (
        <p>There was an error. Please check the console for details</p>
      ) : null}
      <a href="https://github.com/carbonellpablo/empanada.rocks">
        <h2>Github repository</h2>
      </a>
      <div className="content">
        <p>Only works on desktop, not mobile.</p>
        <p>You need to have the browser extension Metamask installed.</p>
        <p>Make sure you are on the &apos;Rinkeby&apos; network.</p>
      </div>
    </div>
  );
}

export default App;

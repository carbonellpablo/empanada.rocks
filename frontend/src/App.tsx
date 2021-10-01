import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { NFTfactory } from './config';

function App(): JSX.Element {
  const [txId, setTxId] = useState();
  const [error, setError] = useState();
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    mintNFT();
  };

  async function mintNFT() {
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

        const transaction = await contract.safeMint();

        console.log(await transaction.wait());
      }
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  }

  return (
    <div className="App">
      <h1>empanda.rocks</h1>
      <h2>An NFT collection featuring 12 empanadas</h2>
      <img src="./base.png" width="400px" height="400px" />

      {txId ? (
        <p>
          Congratulations! your NFT was transfer. You can see the transaction
          here:{' '}
        </p>
      ) : (
        <button onClick={handleClick}>Get your free Empanada!</button>
      )}

      <div className="content">
        <h2>About</h2>
        <p>Total supply: 12 NFT</p>
        <p>Max mint per address: 1 NFT</p>
        <p>
          <a href="https://github.com/carbonellpablo/empanada.rocks">
            Github repository
          </a>
        </p>
      </div>

      <div className="content">
        <h2>Instructions</h2>
        <p>Only works on desktop, not mobile.</p>
        <p>You need to have the browser extension Metamask installed.</p>
        <p>Make sure you are on the &apos;Rinkeby&apos; network.</p>
        <p>Click on the button above!</p>
      </div>
    </div>
  );
}

export default App;

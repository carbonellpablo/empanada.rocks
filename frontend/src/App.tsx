import './App.css';
import { ethers } from 'ethers';
import { NFTfactory} from './config';

function App(): JSX.Element {
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
      <img src="./base.png" />
      <button onClick={handleClick}>Get your free Empanada!</button>
    </div>
  );
}

export default App;

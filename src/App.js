import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    wen3: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;

      if (window.ethereum) {
        provider = window.ethereum;
        try {
          await provider.enable();
        } catch {
          console.error("User denied account access!");
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }

      setWeb3Api({ web3: new Web3(provider), provider });
    };

    loadProvider();
  }, []);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
            Current balance: <strong>10</strong> ETH
          </div>
          <div className="faucet-buttons">
            <button className="button mr-2">Donate</button>
            <button className="button">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

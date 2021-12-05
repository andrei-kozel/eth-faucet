import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({ web3: new Web3(provider), provider });
      } else {
        console.error("Please install metamask");
      }

      setWeb3Api({ web3: new Web3(provider), provider });
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <span>
            <strong>Account: </strong>
          </span>
          <h1>{account ? account : "Not connected"}</h1>
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

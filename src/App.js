import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);

      if (provider) {
        setWeb3Api({ web3: new Web3(provider), provider, contract });
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
          <div className="is-flex is-align-items-center">
            <span>
              <strong className="mr-2">Account: </strong>
            </span>
            {account ? (
              <div>{account}</div>
            ) : (
              <div className="faucet-buttons">
                <button
                  className="button is-info is-small"
                  onClick={() =>
                    web3Api.provider.request({ method: "eth_requestAccounts" })
                  }
                >
                  Connect wallet
                </button>
              </div>
            )}
          </div>
          <div className="balance-view is-size-2 my-4">
            Current balance: <strong>10</strong> ETH
          </div>
          <div className="faucet-buttons">
            <button className="button is-link mr-2">Donate</button>
            <button className="button is-primary">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

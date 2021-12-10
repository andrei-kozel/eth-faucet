import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);
        setAccountListener(provider);
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        });
      } else {
        setWeb3Api({
          ...web3Api,
          isProviderLoaded: true,
        });
        console.error("Please install metamask");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);
  const reload = useCallback(
    () => setShouldReload(!shouldReload),
    [shouldReload]
  );

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });

    reload();
  }, [web3Api, account, reload]);

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account,
    });
    reload();
  };

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3Api.isProviderLoaded ? (
            <div className="is-flex is-align-items-center">
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
              {account ? (
                <div>{account}</div>
              ) : !web3Api.provider ? (
                <>
                  <div className="tag is-small is-warning is-rounded">
                    Wallet is not detected!
                    <a
                      target="_blank"
                      href="https://docs.metamask.io"
                      rel="noreferrer"
                      className="ml-2"
                    >
                      Install Metamask
                    </a>
                  </div>
                </>
              ) : (
                <div className="faucet-buttons">
                  <button
                    className="button is-info is-small"
                    onClick={() =>
                      web3Api.provider.request({
                        method: "eth_requestAccounts",
                      })
                    }
                  >
                    Connect wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span>Looking for Web3 ...</span>
          )}

          <div className="balance-view is-size-2 my-4">
            Current balance: <strong>{balance}</strong> ETH
          </div>
          <div className="faucet-buttons">
            <button
              className="button is-link mr-2"
              onClick={addFunds}
              disabled={!account}
            >
              Donate 1 ETH
            </button>
            <button
              className="button is-primary"
              onClick={withdraw}
              disabled={!account}
            >
              Withdraw 0.1 ETH
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

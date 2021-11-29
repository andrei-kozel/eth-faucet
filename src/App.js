import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const loadProvider = async () => {
      // with metamask we have an access to window.ethereum & to window.web3
      // metamask injexts a global API into website
      // this API allows websites to request users, accounts, read data to blockchain,
      // sign messages and transactions

      console.log(window.web3);
      console.log(window.ethereum);
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
            <button
              className="button mr-2"
              onClick={async () => {
                const accounts = await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
                console.log(accounts);
              }}
            >
              Donate
            </button>
            <button className="button">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

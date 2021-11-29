import "./App.css";

function App() {
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

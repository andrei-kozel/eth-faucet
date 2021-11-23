// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint256 public numberOfFunders;
    mapping(uint256 => address) lutFunders;
    mapping(address => bool) funders;

    receive() external payable {}

    function addFunds() external payable {
        if (!funders[msg.sender]) {
            uint256 index = numberOfFunders++;
            lutFunders[index] = msg.sender;
            funders[msg.sender] = true;
        }
    }

    function withdraw(uint256 withdrawAmount) external {
        if (withdrawAmount < 1000000000000000000) {
            payable(msg.sender).transfer(withdrawAmount);
        }
    }

    function getFundersAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numberOfFunders);
        for (uint256 i = 0; i < numberOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }
}

// just for testing
//
// let instance = await Faucet.deployed()
// instance.addFunds({from: accounts[0], value: "2000000000000000000"})
// instance.addFunds({from: accounts[1], value: "2000000000000000000"})
// instance.withdraw("500000000000000000", {from :accounts[1]})
// instance.getFunderAtIndex(0)
// instance.getAllFunders()
// let balance = web3.eth.getBalance(accounts[1]).then(value => web3.utils.fromWei(value))

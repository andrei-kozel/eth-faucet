// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint256 public numberOfFunders;
    address public owner;
    mapping(uint256 => address) lutFunders;
    mapping(address => bool) funders;

    constructor() {
        owner = msg.sender;
    }

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ETH"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }

    receive() external payable {}

    function addFunds() external payable {
        if (!funders[msg.sender]) {
            uint256 index = numberOfFunders++;
            lutFunders[index] = msg.sender;
            funders[msg.sender] = true;
        }
    }

    function withdraw(uint256 withdrawAmount)
        external
        limitWithdraw(withdrawAmount)
    {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
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

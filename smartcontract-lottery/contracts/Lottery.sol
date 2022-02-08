// SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

contract Lottery {
    address payable[] public players;
    uint256 public usdEntryFee;

    constructor() public {
        usdEntryFee = 50* (10**18)
    }

    function enter() public payable{
        // $50 min
        require();
        players.push(msg.sender)
    }

    function getEntranceFee() public view returns (uint256) {
        // ?
    }

    function startLottery() public {}

    function endLottery() public {}
}

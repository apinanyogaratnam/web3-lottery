// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Lottery {
    
    address ownerAddress;
    uint jackpotAmount;
    mapping (address => uint) playersToAmountDeposited;
    address[] players;

    mapping(address => uint) winnersHistory;
    
    constructor() {
        ownerAddress = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == ownerAddress);
        _;
    }

    function depositIntoJackpot() external payable {
        jackpotAmount += msg.value;

        address player = msg.sender;
        if (playersToAmountDeposited[player] == 0) {
            players.push(player);
            playersToAmountDeposited[player] = msg.value;

            return;
        }

        playersToAmountDeposited[player] += msg.value;
    }

    function getJackpotAmount() external view returns (uint) {
        return jackpotAmount;
    }

    function random() internal view returns (uint) {
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }

    function resetPlayersToAmountDeposited() internal {
        for (uint i=0; i<players.length; i++) {
            playersToAmountDeposited[players[i]] = 0;
        }
    }

    function drawLottery() onlyOwner external returns (address) {
        uint index = random() % players.length;
        address winner = address(players[index]);
        uint contractBalance = address(this).balance;

        payable(winner).transfer(contractBalance);
        winnersHistory[winner] += contractBalance;

        resetPlayersToAmountDeposited();
        players = new address[](0);
        jackpotAmount = 0;

        return winner;
    }
}

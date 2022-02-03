pragma solidity ^0.8.0;

contract Example {
    string private message = "Hello, World!";

    constructor() {
        message = "Hello, World!";
    }

    // @return (string) returns message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // @param (string) message to set
    function setMessage(string memory _message) public {
        message = _message;
    }
}

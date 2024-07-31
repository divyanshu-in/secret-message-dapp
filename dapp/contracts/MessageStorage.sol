// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MessageStorage {
    string private _message;
    bytes32 private immutable _passwordHash;
    address private immutable _admin;

    event MessageUpdated(string newMessage);

    /**
     * @dev Sets the initial message, password hash, and admin.
     * @param message The initial message to store.
     * @param password The password required to retrieve the message.
     */
    constructor(string memory message, string memory password) {
        _message = message;
        _passwordHash = keccak256(abi.encodePacked(password));
        _admin = msg.sender;
    }

    /**
     * @dev Retrieves the stored message if the correct password is provided.
     * @param password The password to access the message.
     * @return The stored message.
     */
    function getMessage(string memory password) public view returns (string memory) {
        require(keccak256(abi.encodePacked(password)) == _passwordHash, "MessageStorage: incorrect password");
        return _message;
    }

    /**
     * @dev Sets a new message. Only callable by the admin.
     * @param message The new message to store.
     */
    function setMessage(string memory message) public { 
        require(msg.sender == _admin, "MessageStorage: sender not admin");
        _message = message;
        emit MessageUpdated(message); // Emit event for the new message
    }

    /**
     * @dev Returns the address of the admin.
     * @return The address of the admin.
     */
    function getAdmin() public view returns (address) {
        return _admin;
    }
}

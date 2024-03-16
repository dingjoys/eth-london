// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MetoBadge is ERC1155 {
    /**
     * Indexed identity Keys
     */
    mapping(uint => string) public identityKeys;

    /**
     * Identity value mapping
     */
    mapping(uint => bytes32) public identities;

    /**
     * owner => walletId
     */
    mapping(address => address) public connections;

    constructor() ERC1155("") {}

    function mint(address[] memory owners, address walletId) public payable {
        uint id = uint256(uint160(walletId));
        // _mint(msg.sender, 1, 100, "");
        // super.balanceOf
    }

    function update(uint id, bytes32 identity) public {}

    /**
     * Construct metadata in the contract
     */
    function tokenURI(uint256 id) public view returns (string memory) {
        return "{}";
    }
}

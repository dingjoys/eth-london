// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./base64.sol";

error Soulbound();

contract MetoBadge is ERC1155, Ownable, ICredentialValidator {
    constructor()
        ERC1155("https://token-cdn-domain/{id}.json")
        Ownable(msg.sender)
    {}

    /**
     * Indexed identity Keys; store up to 256 credentials
     */
    mapping(uint8 => string) public credentialKeys;

    /**
     * Identity value mapping
     */
    mapping(uint => bytes32) public credentials;

    /**
     * owner => walletId
     */
    mapping(address => address) public connections;

    function mintTo(
        address owner_,
        address walletId,
        bytes32 data
    ) public onlyOwner {
        require(connections[owner_] == address(0), "minted");
        // require(
        //     owner() == msg.sender || connections[owner_] == walletId,
        //     "not authorized"
        // );
        uint id = uint256(uint160(walletId));
        _mint(owner_, id, 1, "");
        credentials[id] = data;
    }

    function submit(address walletId, bytes32 credential_) public onlyOwner {
        uint id = uint256(uint160(walletId));
        credentials[id] = credential_;
    }

    function update(uint id, bytes32 identity) public {}

    function generateSVG(uint id) private view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="606.2" height="819.4" viewBox="0 0 606.2 819.4">',
                    "<text>",
                    '<tspan x="20" y="20">something1</tspan>',
                    '<tspan x="20" y="40">something2</tspan>',
                    "</text>",
                    "</svg>"
                )
            );
    }

    /**
     * Construct metadata in the contract
     */
    function tokenURI(uint256 id) public view returns (string memory) {
        string memory pageSVG = Base64.encode(bytes(generateSVG(id)));
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                "{",
                                '"name":"',
                                "metobadge",
                                '",',
                                '"description":"',
                                "description",
                                '",',
                                '"image":"',
                                "data:image/svg+xml;base64,",
                                pageSVG,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    /**
     * @notice SOULBOUND: Block transfers.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        require(from == address(0) || to == address(0), "nontransferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @notice SOULBOUND: Block approvals.
     */
    function setApprovalForAll(
        address operator,
        bool _approved
    ) public virtual override {
        revert Soulbound();
    }

    /**
     * @notice SOULBOUND: Block approvals.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        revert Soulbound();
    }
}

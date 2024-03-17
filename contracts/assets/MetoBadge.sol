// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../lib/base64.sol";
import "../sdk/ICredentialValidator.sol";

error Soulbound();

/**
 * TODO - add multiple wallet support
 *
 */
contract MetoBadge is ERC1155, Ownable, ICredentialValidator {
    constructor() ERC1155("https://domain/{id}.json") Ownable(msg.sender) {
        credentialKeys[0] = "Holonym Verified";
        credentialKeys[1] = "Sent 1+ Transaction On Base";
    }

    /**
     * Indexed identity Keys; store up to 256 credentials
     */
    mapping(uint8 => string) public credentialKeys;

    /**
     * Identity value mapping
     */
    mapping(uint => uint) public credentials;

    /**
     * owner => walletId
     */
    mapping(address => address) public proxies;

    function mintTo(address owner_, address proxy, uint data) public onlyOwner {
        require(proxies[owner_] == address(0), "minted");
        // require(
        //     owner() == msg.sender || holdings[owner_] == walletId,
        //     "not authorized"
        // );
        uint id = uint256(uint160(proxy));
        _mint(owner_, id, 1, "");
        credentials[id] = data;
        proxies[owner_] = proxy;
    }

    function validate(
        address proxy,
        uint requirements
    ) public view override returns (bool) {
        return credentials[uint256(uint160(proxy))] & requirements > 0;
    }

    function validateAll(
        address proxy,
        uint requirements
    ) public view override returns (bool) {
        return
            credentials[uint256(uint160(proxy))] & requirements == requirements;
    }

    function submit(address proxy, uint credential_) public onlyOwner {
        uint id = uint256(uint160(proxy));
        credentials[id] = credential_;
    }

    function generateSVG(uint id) public view returns (string memory) {
        string
            memory buff = '<svg xmlns="http://www.w3.org/2000/svg" width="606.2" height="819.4" viewBox="0 0 606.2 819.4" style="background-color: black;"><text fill="#ffffff">';
        buff = string(
            abi.encodePacked(
                buff,
                '<tspan x="20" y="30">Proxy: ',
                Strings.toHexString(uint160(id), 20),
                "</tspan>"
            )
        );
        uint tmp = credentials[id];
        for (uint8 i = 0; tmp > 0 && i < 255; i++) {
            if (tmp & 1 > 0) {
                buff = string(
                    abi.encodePacked(
                        buff,
                        '<tspan x="20" y="',
                        Strings.toString(20 * i + 50),
                        '">',
                        credentialKeys[i],
                        "</tspan>"
                    )
                );
            }
            tmp >>= 1;
        }

        return string(abi.encodePacked(buff, "</text></svg>"));
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
     * SOULBOUNDed
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "nontransferable");
        super._safeTransferFrom(from, to, id, value, data);
    }

    /**
     * SOULBOUNDed
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "nontransferable");
        super._safeBatchTransferFrom(from, to, ids, values, data);
    }
}

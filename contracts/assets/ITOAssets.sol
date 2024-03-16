// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../sdk/ICredentialValidator.sol";

contract ITOAsset is ERC20("IFO ASSET", "ASS") {
    address private VALIDATOR_ADDR = address(0);
    uint private CREDENTIAL_REQUIREMENT =
        0x0000000000000000000000000000000000000000000000000000000000000001;

    uint private _requirements;
    ICredentialValidator credentialValidator;

    modifier validated() {
        require(
            credentialValidator.validate(msg.sender, _requirements),
            "invalidated"
        );
        _;
    }

    constructor() {
        _requirements = CREDENTIAL_REQUIREMENT;
        credentialValidator = ICredentialValidator(VALIDATOR_ADDR);
    }

    function swap(uint amount) public payable validated {
        // do something
    }
}

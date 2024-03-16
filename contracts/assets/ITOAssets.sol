// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../sdk/ICredValidatorConsumer.sol";

contract ITOAsset is ERC20("IFO ASSET", "ASS"), ICredValidatorConsumer {
    bytes32 private _requirement;
    ICredentialValidator credentialValidator;

    constructor(bytes32 requirement_, address validatorAddr_) {
    }

    modifier validated() {
        require(credentialValidator.validate(msg.sender), "invalidated");
        _;
    }

    address private VALIDATOR_ADDR = "";
    bytes32 private CREDENTIAL_REQUIREMENT =
        0x0000000000000000000000000000000000000000000000000000000000000001;

    constructor() {
        _requirement = CREDENTIAL_REQUIREMENT;
        credentialValidator = ICredentialValidator(VALIDATOR_ADDR);
    }

    function swap(amount) public payable validated{
        // do something
    }
}

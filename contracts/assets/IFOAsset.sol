// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../sdk/ICredentialValidator.sol";

contract IFOAsset is ERC20 {
    address private VALIDATOR_ADDR = 0xFEfFE39C06FeC33819BD82e1Aa935F87408E1149;
    uint private CREDENTIAL_REQUIREMENT =
        0x0000000000000000000000000000000000000000000000000000000000000001;

    uint private _requirements;
    ICredentialValidator credentialValidator;

    uint _initPriceVerified;
    uint _initPriceNotVerified;
    uint amount = 1000000000000000000;

    constructor(
        string memory name_,
        string memory symbol_,
        uint initPriceVerified,
        uint initPriceNotVerified
    ) ERC20(name_, symbol_) {
        _requirements = CREDENTIAL_REQUIREMENT;
        credentialValidator = ICredentialValidator(VALIDATOR_ADDR);
        _initPriceVerified = initPriceVerified;
        _initPriceNotVerified = initPriceNotVerified;
    }

    function swap() public payable {
        if (credentialValidator.validate(msg.sender, _requirements)) {
            require(msg.value >= _initPriceVerified, "insufficient fund");
        } else {
            require(msg.value >= _initPriceNotVerified, "insufficient fund");
        }
        _mint(msg.sender, amount);
    }
}

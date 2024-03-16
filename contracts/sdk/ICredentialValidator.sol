// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract ICredentialValidator {
    function validate(address owner) public virtual returns (bool);
}
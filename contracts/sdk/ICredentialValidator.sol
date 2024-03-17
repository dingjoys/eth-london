// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract ICredentialValidator {
    function validate(
        address proxy,
        uint requirements
    ) public view virtual returns (bool);

    function validateAll(
        address proxy,
        uint requirements
    ) public view virtual returns (bool);
}

// SPDX-License-Identifier: Unlicense
// SPDX=License-Identirier: UNLICENSED
pragma solidity ^0.8.18;

import '../libraries/Math.sol';

contract MathTest {
    function min(uint x, uint y) public pure returns (uint z) {
        z = Math.min(x, y);
    }

    function sqrt(uint y) public pure returns (uint z) {
        z = Math.sqrt(y);
    }
}
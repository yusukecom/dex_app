// SPDX-License-Identifier: Unlicense
// SPDX=License-Identirier: UNLICENSED
pragma solidity ^0.8.18;

import '../libraries/DexLibrary.sol';

contract  DexLibraryTest {
    function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB){
        amountB = DexLibrary.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut) {
        amountOut = DexLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    }
    
}
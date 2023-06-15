// SPDX-License-Identifier: Unlicense
// SPDX=License-Identirier: UNLICENSED
pragma solidity ^0.8.18;


library  DexLibrary {
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB){
        require(amountA > 0, 'DexLibrary: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'DexLibrary: INSUFFICIENT_LIQUIDITY');
        amountB = amountA * reserveB / reserveA;

    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
        require(amountIn > 0, 'DexLibrary: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'DexLibrary: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = (reserveIn * 1000) + amountInWithFee;
        amountOut = numerator / denominator;
    }
    
}
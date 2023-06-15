// SPDX-License-Identifier: Unlicense
// SPDX=License-Identirier: UNLICENSED
pragma solidity ^0.8.18;

import './libraries/DexLibrary.sol';
import './DexFactory.sol';
import './interfaces/IERC20.sol';
import './DexPool.sol';

contract DexRouter{
    address public immutable factory;

    constructor(address _factory){
        factory = _factory;
    }
    
    modifier ensure(uint deadline){
        require(deadline >= block.timestamp, 'DexRouter: EXPIRED');
        _;
    }

    function _addLiquidity(
        address pool,
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal view returns (uint amountA, uint amountB) {
        uint reserve0 = DexPool(pool).reserve0();
        uint reserve1 = DexPool(pool).reserve1();
        (uint reserveA, uint reserveB) = tokenA < tokenB ? (reserve0, reserve1) : (reserve1, reserve0);

        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = DexLibrary.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'DexRouter: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = DexLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'DexRouter: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

   function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        address pool = DexFactory(factory).getPool(tokenA, tokenB);
        if (pool == address(0)) {
            DexFactory(factory).createPool(tokenA, tokenB);
            pool = DexFactory(factory).getPool(tokenA, tokenB);
        }
        (amountA, amountB) = _addLiquidity(pool, tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);

        bool successA = IERC20(tokenA).transferfrom(msg.sender, pool, amountA);
        require(successA, 'DexRouter: TOKEN_A_TRANSFER_FAILED');
        bool successB = IERC20(tokenB).transferfrom(msg.sender, pool, amountB);
        require(successB, 'DexRouter: TOKEN_B_TRANSFER_FAILED');

        liquidity = DexPool(pool).mint(to);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )external ensure(deadline) returns (uint amountA, uint amountB) {
        address pool = DexFactory(factory).getPool(tokenA, tokenB);
        require(pool != address(0), 'DexRouter: POOL_DOES_NOT_EXSIST');
        DexPool(pool).transferfrom(msg.sender, pool, liquidity);
        (uint amount0, uint amount1) = DexPool(pool).burn(to);
        (amountA, amountB) = tokenA < tokenB ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, 'DexRouter: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'DexRouter: INSUFFICIENT_B_AMOUNT');

    }

    function swapTokenPair(
        address tokenIn,
        address tokenOut,
        uint amountIn,
        uint amountOutMin,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint amountOut) {
        address pool = DexFactory(factory).getPool(tokenIn, tokenOut);
        require(pool != address(0), 'DexRouter: POOL_DOES_NOT_EXIST');

        {
            uint reserve0 = DexPool(pool).reserve0();
            uint reserve1 = DexPool(pool).reserve1();
            (uint reserveIn, uint reserveOut) = tokenIn < tokenOut ? (reserve0, reserve1) : (reserve1, reserve0);
            amountOut = DexLibrary.getAmountOut(amountIn, reserveIn , reserveOut);
        }
        require(amountOut >= amountOutMin, 'DexRouter: INSUFFICIENT_OUTPUT_AMOUNT');

        bool success = IERC20(tokenIn).transferfrom(msg.sender, pool, amountIn);
        require(success, 'DexRouter: TOKEN_IN_TRANSFER_FAILED');
        (uint amount0Out, uint amount1Out) = tokenIn < tokenOut ? (uint(0), amountOut) : (amountOut, uint(0));
        DexPool(pool).swap(amount0Out, amount1Out, to);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut){
        amountOut = DexLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    }

}
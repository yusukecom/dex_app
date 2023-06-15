// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import './DexPool.sol';


contract DexFactory {
      mapping(address => mapping(address => address)) public getPool;

    event PoolCreated(address indexed token0, address indexed token1, address pool);

    function createPool(address tokenA, address tokenB) external returns (address pool) {
        require(tokenA != tokenB, 'DexFactory: IDENTICAL_TOKEN_ADDRESS');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'DexFactory: ZERO_ADDRESS');
        require(getPool[token0][token1] == address(0), 'DexFactory: TOKEN_POOL_EXISTS');
        
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        DexPool poolContract = new DexPool{salt: salt}();
        poolContract.initialize(token0, token1);

        pool = address(poolContract);
        getPool[token0][token1] = pool;
        getPool[token1][token0] = pool;
        emit PoolCreated(token0, token1, pool);
    }
}
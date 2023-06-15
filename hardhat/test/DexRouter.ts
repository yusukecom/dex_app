import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { ContractFactory, Contract } from "ethers";
import { DexFactory__factory } from "../typechain-types";
import { getCreate2Address } from "./lib/utilities";
import DexPool from "../artifacts/contracts/DexPool.sol/DexPool.json";
import { getAmountOut } from "./lib/utilities";

const MINIMUM_LIQUIDITY = 10 ** 3;


describe("DexRouter", function () {
    async function  step1Fixture() {
        const [owner, account1, account2] = await ethers.getSigners();

        const Token =  await ethers.getContractFactory("TokenTest");
        const tokenA = await Token.deploy("tokenA", "A", 18, 1000000);
        const tokenB = await Token.deploy("tokenB", "B", 18, 1000000);
        await tokenA.transfer(account1.address, 200000);
        await tokenB.transfer(account1.address, 300000);
        await tokenA.transfer(account2.address, 400000);
        await tokenB.transfer(account2.address, 500000);

        const Factory = await ethers.getContractFactory("DexFactory");
        const factory = await Factory.deploy();
        await factory.deployed();
        await factory.createPool(tokenA.address, tokenB.address);
        const poolAddress = await factory.getPool(tokenA.address, tokenB.address);
        const pool = new ethers.Contract(poolAddress, DexPool.abi, ethers.provider);

        const Router = await ethers.getContractFactory("DexRouter");
        const router = await Router.deploy(factory.address);
        await router.deployed();

        return { owner, account1, account2, tokenA, tokenB, factory, pool, router}

        
    }

    it("check initial balances", async function () {
        const { owner, account1, account2, tokenA, tokenB, pool } = await loadFixture(step1Fixture);

        expect(await tokenA.balanceOf(owner.address)).to.eq(600000);
        expect(await tokenB.balanceOf(owner.address)).to.eq(600000);
        expect(await tokenA.balanceOf(account1.address)).to.eq(200000);
        expect(await tokenB.balanceOf(account1.address)).to.eq(200000);
        expect(await tokenA.balanceOf(account2.address)).to.eq(200000);
        expect(await tokenB.balanceOf(account2.address)).to.eq(200000);
        expect(await tokenA.balanceOf(pool.address)).to.eq(0);
        expect(await tokenB.balanceOf(pool.address)).to.eq(0);

        
    })

    it("check factory address", async function () {
        const { factory, router } = await loadFixture(step1Fixture);

        expect(await router.factory()).to.eq(factory.address);
    })

    async function step2Fixture() {
        const { owner, account1, account2, tokenA, tokenB, factory, pool, router} = await loadFixture(step1Fixture);

        const deadline = Math.floor(Date.now() / 1000) + 60;
        const amountADesired = 100000;
        const amountBDesired = 200000;
        const [amount0Desired, amount1Desired] = tokenA.address < tokenB.address ? [amountADesired, amountBDesired] : [amountBDesired , amountADesired];
        const liquidity = Math.floor(Math.sqrt(amountADesired * amountBDesired) - MINIMUM_LIQUIDITY);
        const totalSupply = Math.floor(Math.sqrt(amountADesired * amountBDesired));

        await tokenA.connect(account1).approve(router.address, amountADesired);
        await tokenB.connect(account1).approve(router.address, amountBDesired);
        await expect(router.connect(account1).addLiquidity(
            tokenA.address, tokenB.address, amountADesired, amountBDesired, 0, 0, account1.address, deadline
        )).to.emit(pool, 'Mint').withArgs(router.address, amount0Desired, amount1Desired).to.emit(pool, 'Transfer').withArgs(ethers.constants.AddressZero, account1.address, liquidity)

        expect(await tokenA.balanceOf(account1.address)).to.eq(100000);
        expect(await tokenB.balanceOf(account1.address)).to.eq(100000);
        expect(await tokenA.balanceOf(pool.address)).to.eq(amountADesired);
        expect(await tokenB.balanceOf(pool.address)).to.eq(amountBDesired);
        expect(await pool.balanceOf(account1.address)).to.eq(liquidity);
        expect(await pool.totalSupply()).to.eq(totalSupply);


        return { owner, account1, account2, tokenA, tokenB, factory, pool, router}
    };

    it("check balances after initial addLiquidity", async function() {
        const { owner, account1, account2, tokenA, tokenB, factory, pool, router } = await loadFixture(step2Fixture);

        expect(await tokenA.balanceOf(owner.address)).to.eq(400000);
        expect(await tokenB.balanceOf(owner.address)).to.eq(200000);
        expect(await tokenA.balanceOf(account1.address)).to.eq(100000);
        expect(await tokenB.balanceOf(account1.address)).to.eq(100000);
        expect(await tokenA.balanceOf(account2.address)).to.eq(400000);
        expect(await tokenB.balanceOf(account2.address)).to.eq(500000);
        expect(await tokenA.balanceOf(pool.address)).to.eq(10000);
        expect(await tokenB.balanceOf(pool.address)).to.eq(20000);

        expect(await pool.reseve0()).to.eq(10000);
        expect(await pool.reseve1()).to.eq(20000);

        expect(await pool.balanceOf(owner.address)).to.eq(0);
        expect(await pool.balanceOf(account1.address)).to.eq(140421);
        expect(await pool.balanceOf(account2.address)).to.eq(0);
        expect(await pool.balanceOf(pool.address)).to.eq(0);

    })


    describe("removeLiquidity", function (){
        it("test removeLiquidity", async function () {
            const { owner, account1, account2, tokenA, tokenB, factory, pool, router } = await loadFixture(step2Fixture);

            const deadline = Math.floor(Date.now() / 1000) + 60;
            const liquidity = 40421;
            const totalSupply = await pool.totalSupply();
            const reserve0 = await pool.reserve0();
            const reserve1 = await pool.reserve1();
            const amount0Withdrawn = Math.floor(reserve0 * liquidity / totalSupply);
            const amount1Withdrawn = Math.floor(reserve1 * liquidity / totalSupply);
            const [amountAWithdrawn, amountBWithdrawn] = tokenA.address < tokenB.address ? [amount0Withdrawn, amount1Withdrawn] : [amount1Withdrawn, amount0Withdrawn];
            await pool.connect(account1).approve(router.address, liquidity);
            await expect(router.connect(account1).removeLiquidity(tokenA.address, tokenB.address, liquidity, 0, 0, account2.address, deadline ))
                .to.emit(pool, 'Transfer').withArgs(account1.address, pool.address, liquidity)
                .to.emit(pool, 'Burn').withArgs(router.address, amount0Withdrawn, amount1Withdrawn, account2.address);

            const [reserveA, reserveB] = tokenA.address < tokenB.address ? [reserve0, reserve1] : [reserve1, reserve0];
            expect(await tokenA.balanceOf(pool.address)).to.eq(reserveA - amountAWithdrawn);
            expect(await tokenB.balanceOf(pool.address)).to.eq(reserveB - amountBWithdrawn);
            expect(await tokenA.balanceOf(account2.address)).to.eq(400000 + amountAWithdrawn);
            expect(await tokenB.balanceOf(account2.address)).to.eq(500000 + amountBWithdrawn);

            expect(await pool.balanceOf(owner.address)).to.eq(0);
            expect(await pool.balanceOf(account1.address)).to.eq(100000);
            expect(await pool.balanceOf(account2.address)).to.eq(0);
            expect(await pool.balanceOf(pool.address)).to.eq(0);

        })

        it("revert by amountMin", async function () {
            const { owner, account1, account2, tokenA, tokenB, factory, pool, router } = await loadFixture(step2Fixture);

            const deadline = Math.floor(Date.now() / 1000) + 60;
            const amountAMin = 10000;
            const amountBMin = 10000;
            const liquidity = 10000;

            await pool.connect(account1).approve(router.address, liquidity);
            await expect(router.connect(account1).removeLiquidity(
                tokenA.address, tokenB.address, liquidity, amountAMin, amountBMin, account2.address, deadline
            )).to.be.revertedWith('DexRouter: INSUFFICIENT_A_AMOUNT');

        })

        it("revert by invalid token pairs", async function () {
            const { owner, account1, account2, tokenA, tokenB, factory, pool, router } = await loadFixture(step2Fixture);

            const deadline = Math.floor(Date.now() / 1000) + 60;
            const liquidity = 40421;
            await pool.connect(account1).approve(router.address, liquidity);
            await expect(router.connect(account1).removeLiquidity(owner.address, tokenB.address, liquidity, 0, 0, account2.address, deadline))
                .to.be.revertedWith('DexRouter: POOL_DOES_NOT_EXSIST');

        })
    })

    describe("swapTokenPair", function () {
        it("test swapTokenPair", async function () {
            const { owner, account1, account2, tokenA, tokenB, factory, pool, router } = await loadFixture(step2Fixture);

            const deadline = Math.floor(Date.now() / 1000) + 60;
            const reserveA = await tokenA.balanceOf(pool.address);
            const reserveB = await tokenB.balanceOf(pool.address);
            const amountIn = 100000;
            const amountOut = await router.getAmountOut(amountIn, reserveA, reserveB);
            const [amount0In, amount1In] = tokenA.address < tokenB.address ? [amountIn, 0] : [0, amountIn];
            const [amount0Out, amount1Out] = tokenA.address < tokenB.address ? [0, amountOut] : [amountOut, 0];

            await tokenA.connect(account2).approve(router.address, amountIn);
            await expect(router.connect(account2).swapTokenPair(tokenA.address, tokenB.address, amountIn, 0,account2.address, deadline))
                .to.emit(pool, 'Swap').withArgs(router.address, amount0In, amount1In, amount0Out, amount1Out, account2.address);
            
            expect(await tokenA.balanceOf(pool.address)).to.eq(reserveA.add(amountIn));
            expect(await tokenB.balanceOf(account2.address)).to.eq(amountOut.add(500000));

    
        })
    })


})


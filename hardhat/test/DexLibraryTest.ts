import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { ContractFactory, Contract } from "ethers";
import { BigNumber } from "ethers";

describe('DexLibrary', function() {
    async function deployLibFixture() {
        const Lib: ContractFactory =  await ethers.getContractFactory("DexLibraryTest");
        const lib: Contract = await Lib.deploy();
        await lib.deployed();
        return { lib }

    }

    describe( 'quote', async function() {
        it('get quote', async function() {
            const { lib } = await loadFixture(deployLibFixture);
            const amountA: BigNumber = BigNumber.from(2).pow(200);
            const reserveA: BigNumber = BigNumber.from(123);
            const reserveB: BigNumber = BigNumber.from(2).pow(50).add(1);
            const amountB: BigNumber = amountA.mul(reserveB).div(reserveA);
            //console.log(lib)
            expect(await lib.quote(amountA, reserveA, reserveB)).to.eq(amountB);
        })

        it('insufficient amount', async function() {
            const {lib} = await loadFixture(deployLibFixture);
            await expect(lib.quote(0, 100, 200)).to.be.revertedWith('DexLibrary: INSUFFICIENT_AMOUNT');
        })

        it('insufficient liquidity', async function() {
            const { lib } = await loadFixture(deployLibFixture);
            await expect(lib.quote(100, 0, 200)).to.be.revertedWith('DexLibrary: INSUFFICIENT_LIQUIDITY');

        })

    })

    describe('getAmountOut', async function() {
        it('get amountOut', async function() {
            const { lib } = await loadFixture(deployLibFixture);
            const amountIn: BigNumber = BigNumber.from(2).pow(100).add(1);
            const reserveIn: BigNumber = BigNumber.from(23);
            const reserveOut: BigNumber = BigNumber.from(2).pow(50).add(1);
            const amountInWithFee: BigNumber = amountIn.mul(997);
            const numerator: BigNumber = amountInWithFee.mul(reserveOut);
            const denominator: BigNumber = (reserveIn.mul(1000)).add(amountInWithFee);
            const amountOut: BigNumber = numerator.div(denominator);
            expect(await lib.getAmountOut(amountIn, reserveIn, reserveOut)).to.eq(amountOut);
        })

        it('insufficient input amount', async function()  {
            const { lib } = await loadFixture(deployLibFixture);
            await expect(lib.getAmountOut(0, 100, 200)).to.be.revertedWith('DexLibrary: INSUFFICIENT_INPUT_AMOUNT');
        })

        it('insufficient liquidity', async function () {
            const { lib } = await loadFixture(deployLibFixture);
            await expect(lib.getAmountOut(1000, 0, 200)).to.be.revertedWith('DexLibrary: INSUFFICIENT_LIQUIDITY');

        })
    })
})
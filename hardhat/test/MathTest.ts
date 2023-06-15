import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { ContractFactory, Contract } from "ethers";
import { DexFactory__factory } from "../typechain-types";
import { getCreate2Address } from "./lib/utilities";


describe('Math', function () {
    async function deployMathFixture() {
        const Math: ContractFactory = await ethers.getContractFactory("MathTest");
        const math: Contract = await Math.deploy();
        await math.deployed();
        return {math}
    }

    it('min', async function () {
        const { math } = await loadFixture(deployMathFixture);

        expect(await math.min(0, 1)).to.eq(0);
        expect(await math.min(2, 1)).to.eq(1);
        expect(await math.min(2, 2)).to.eq(2);

    })

    it('sqrt', async function (){
        const { math } = await loadFixture(deployMathFixture);

        const nList = [0, 1, 2, 3, 4, 5, 10, 99, 100 ]
        for(let n of nList){
            expect(await math.sqrt(n)).to.eq(Math.floor(Math.sqrt(n)));
        }
    })
})
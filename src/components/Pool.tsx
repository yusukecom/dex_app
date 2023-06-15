import { ethers } from "ethers"
import type { BigNumber } from "ethers"
import { useContext, useState, useEffect } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
import { InboxIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { ChainContext } from './ChainContext'
import TokenCombobox from './TokenCombobox'
import { loadTokenData, loadChainData, loadTokenList } from '@/lib/load'
import type { TokenData } from "@/lib/load"
import { getAmountOut } from '@/lib/utilities'
import logo from '../../public/logo.svg'
import { poolStyle as style } from '@/styles/tailwindcss'
import DexPool from '../../hardhat/artifacts/contracts/DexPool.sol/DexPool.json'
import DexRouter from '../../hardhat/artifacts/contracts/DexRouter.sol/DexRouter.json'
import TxLog from "./TxLog"
import { resolve } from "path"
import PositionItem from "./PositionItem"
import type { positionData } from "./PositionItem"
import AddLiquidityDialog from "./AddLiquidityDialog"

const Pool = () =>{
    const [positions, setPositions] = useState<Map<string, positionData>>(new Map())
    const {chianId, currentAccount, singer, getPoolAddress} = useContext(ChainContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const positionsArray = Array.from(positions.entries())
    positionsArray.sort(function (x, y) { if (x[0] < y[0]) { return -1; } return 1; })

    function handleOpenliquidity(e: MouseEvent<HTMLElement>){
        setIsOpen(true)
    }

    useEffect(() => {
        const retrievePosition = async function(token0: TokenData, token1: TokenData) {
            const address0 = token0.address
            const address1 = token1.address

            const poolAddress = await getPoolAddress(address0, address1)
            if(poolAddress === undefined){ return }
            const pool = new ethers.Contract(poolAddress, DexPool.abi, singer.provider)
            const liquidity: BigNumber = await pool.balanceOf(currentAccount)

            if(liquidity.gt(0)){
                const value = { address0, address1, liquidity}
                setPositions((prevPositions) => {
                    const positions = new Map(prevPositions);
                    positions.set(address0 + address1, value);
                    return positions;
                })
            }
            
        }
        const retrievePositions = async function(tokenList: TokenData[]){
            await setPositions(new Map())
            for (let token0 of tokenList){
                for(let token1 of tokenList){
                    if(token0.address < token1.address){
                        retrievePosition(token0, token1)
                    }
                }
            }
        }
        if(currentAccount !== undefined && chianId !== undefined){
            const tokenList = loadTokenList(chianId)
            retrievePositions(tokenList)
        }
    }, [currentAccount, chianId, singer, getPoolAddress])

    return(
        <div className={style.outerContainer}>
            <div className={style.container}>
                <div className={style.headerContainer}>
                    <div className={style.title}>
                        Pool
                    </div>
                    <div className={style.addLiquidityButtonContainer}>
                        <div className={style.addLiquidityButton}>
                            <div onClick={handleOpenliquidity}className={style.addLiquidityButtonText}>
                                +add Liquidity
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.positionsContainer}>
                    {(positionsArray.length === 0) ? 
                    (<div className={style.positionsDefault}>
                        <InboxIcon className={style.inboxIcon}/>
                        <div>
                            Your position will appear here.
                        </div>
                    </div>) : (<>{positionsArray.map((pos) => 
                            <PositionItem key={pos[0]} value={pos[1]}/>)}
                            </>)}
                </div>
                <AddLiquidityDialog show={isOpen} onClose={() => {setIsOpen(false)}}/>

            </div>
        </div>

    )
}

export default Pool
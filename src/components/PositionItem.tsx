import { useContext, useState, useEffect } from 'react'
import { MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TxLog from './TxLog'
import logo from '../../public/fun.gif'
import { positionItemStyle as style } from '@/styles/tailwindcss'
import { loadChainData, loadChainLogo, loadTokenData, loadTokenLogo } from '@/lib/load'
import { ExclamationTriangleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import DexPool from '../../hardhat/artifacts/contracts/DexPool.sol/DexPool.json'
import DexERC20 from '../../hardhat/artifacts/contracts/DexERC20.sol/DexERC20.json'
import DexRouter from '../../hardhat/artifacts/contracts/DexRouter.sol/DexRouter.json'
import { BigNumber, ethers } from 'ethers'
import { ChainContext } from './ChainContext'
import { resolve } from 'path'

const Max_Int256 = BigNumber.from(2).pow(256).sub(1)

export interface positionData {
    address0: string
    address1: string
    liquidity: BigNumber
}

interface PositionItemProps {
    value: positionData
}

const PositionItem = (props: PositionItemProps) => {
    const address0 = props.value.address0
    const address1 = props.value.address1
    const liquidity = props.value.liquidity
    const {chainId, currentAccount, Signer, routerAddress, getPoolAddress} = useContext(ChainContext)
    const token0Data = loadTokenData(chainId, address0)!
    const token1Data = loadTokenData(chainId, address1)!
    const [displayAmount0, setDisplayAmount0] = useState<string>('')
    const [displayAmount1, setDisplayAmount1] = useState<string>('')
    const emptytxInfo = {displayAmount0: '', displayAmount1: '', blockhash: '', transactionHash: ''}
    const [txInfo, settxInfo] = useState(emptytxInfo)
    const [isTxSubmittedOpen, setIsTxSubmittedOpen] = useState<boolean>(false)
    const [isTxConfirmedOpen, setIsTxConfirmedOpen] = useState<boolean>(false)

    async function handleRemove(e: MouseEvent<HTMLElement>){
        const success = await sendRemoveTransaction()
        if(success){
            setDisplayAmount0('0')
            setDisplayAmount1('0')

        }
    }

    async function sendRemoveTransaction(): Promise<boolean>{
        const poolAddress: string = await getPoolAddress(address0, address1)
        const pool = new ethers.Contract(poolAddress, DexPool.abi, Signer)
        const liquidity = await pool.balanceOf(currentAccount)
        const allowance = await pool.allowance(currentAccount, routerAddress)
        if(liquidity.gt(allowance)){
            const tx0  = await pool.approve(routerAddress, Max_Int256).catch((err : any) => {
                console.log('Error while calling pool.approve in handleRemove')
                return false
            })
            await tx0.wait()
        }

        const router = new ethers.Contract(routerAddress, DexRouter.abi, Signer)
        const deadline = Math.floor(Date.now() / 1000 ) + 120
        try{
            const tx = await router.removeLiquidity(address0, address1, liquidity, 0, 0, currentAccount, deadline)
            settxInfo({
                displayAmount0: displayAmount0,
                displayAmount1: displayAmount1,
                blockhash: '',
                transactionHash: tx.hash
            })
            setIsTxSubmittedOpen(true)
            const receipt = await tx.wait()

            await new Promise(resolve => setTimeout(resolve, 3000))

            settxInfo(prevState => {return { ...prevState, blockhash: receipt.blockhash}})
            setIsTxSubmittedOpen(false)
            setIsTxConfirmedOpen(true)
            return true

        }catch (error: any){
            return false
        }
    }

    useEffect(() => {
        const updateDisplayAmountOut = async function () {
            const poolAddress = await getPoolAddress(address0, address1)
            const pool = new ethers.Contract(poolAddress, DexPool.abi, Signer.provider)
            const totalSupply = await pool.totalSupply

            const token0Contract = new ethers.Contract(address0, DexERC20.abi, Signer.provider)
            token0Contract.balanceOf(pool.address).then((reserve0: BigNumber) => {
                const amount0: BigNumber = (reserve0.mul(liquidity)).div(totalSupply)
                setDisplayAmount0(ethers.utils.formatUnits(amount0.toString(), token0Data.decimals))
            })

            const token1Contract = new ethers.Contract(address1, DexERC20.abi, Signer.provider)
            token1Contract.balanceOf(pool.address).then((reserve1: BigNumber) => {
                const amount1: BigNumber = (reserve1.mul(liquidity)).div(totalSupply)
                setDisplayAmount0(ethers.utils.formatUnits(amount1.toString(), token1Data.decimals))
            })
            
        }
        updateDisplayAmountOut()
    }, [Signer, getPoolAddress, address0, address1, liquidity, token0Data.decimals, token1Data.decimals])

    return(
        <div className={style.header}>
            <div className={style.pairLogoContainer}>
                <div>
                    <Image src={loadTokenLogo(chainId, address0)} alt='logo0' height={18} width={18} />
                </div>
                <div  className='-ml-2'>
                    <Image src={loadTokenLogo(chainId, address1)} alt='logo1' height={18} width={18} />
                </div>
                <div className={style.pairLogoContainer}>
                    <span>{token0Data.symbol}</span>
                    <span>/</span>
                    <span>{token1Data.symbol}</span>
                </div>
            </div>

            <div className={style.balanceContainer}>
                <div className={style.balance}>
                    <div className={style.balanceText}>
                        {token0Data.symbol} Locked Balance: {displayAmount0}
                    </div>
                    <div className={style.balanceText}>
                        {token1Data.symbol} Locked Balance: {displayAmount1}
                    </div>
                </div>
                <div className={style.removeButtonContainer}>
                    {(displayAmount0 === '0' && displayAmount1 === '0') ? 
                    (<div className={style.inactiveRemoveButton}>
                        <MinusCircleIcon className={style.circleIcon}/>
                        Remove
                    </div>) :
                    (<div  onClick={handleRemove} className={style.removeButton}>
                        <MinusCircleIcon className={style.circleIcon}/>
                        remove
                    </div>)}
                </div>
            </div>

            <TxLog
                title="Swap Transaction Submitted"
                txURL={`${loadChainData(chainId)?.explorer}/tx/${txInfo.transactionHash}`}
                show={isTxSubmittedOpen}
                onClose={() => setIsTxSubmittedOpen(false)}
            />
            <TxLog
                title="Transaction Confirmed!"
                message={`${txInfo.displayAmount0} ${token0Data.symbol} and ${txInfo.displayAmount1} ${token1Data.symbol} are sent to you`}
                txURL={`${loadChainData(chainId)?.explorer}/tx/${txInfo.transactionHash}`}
                show={isTxConfirmedOpen}
                onClose={() => setIsTxConfirmedOpen(false)}
            />


        </div>

    )

}
export default PositionItem
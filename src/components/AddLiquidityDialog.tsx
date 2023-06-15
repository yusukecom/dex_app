import { useContext, useState, useEffect } from 'react'
import { Fragment} from 'react'
import { Transition, Dialog } from '@headlessui/react'
import Link from 'next/link'
import TxLog from './TxLog'
import logo from '../../public/fun.gif'
import { AddLiquidityStyle as style } from '@/styles/tailwindcss'
import { loadChainData, loadChainLogo, loadTokenData, loadTokenLogo } from '@/lib/load'
import type { TokenData } from '@/lib/load'
import { ExclamationTriangleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import DexPool from '../../hardhat/artifacts/contracts/DexPool.sol/DexPool.json'
import DexERC20 from '../../hardhat/artifacts/contracts/DexERC20.sol/DexERC20.json'
import DexRouter from '../../hardhat/artifacts/contracts/DexRouter.sol/DexRouter.json'
import { BigNumber, Signer, ethers } from 'ethers'
import { ChainContext } from './ChainContext'
import { resolve } from 'path'
import type { ChangeEvent, MouseEvent } from 'react'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import TokenCombobox from './TokenCombobox'
import { getAmountOut } from '@/lib/utilities'
import { TokenField } from './Swap'


interface AddLiquidityDialogProps{
    show: boolean
    onClose: () => void
}

const AddLiquidityDialog = (props: AddLiquidityDialogProps) => {
    const {show, onClose} = props
    const emptyField: TokenField = {address: '', displayAmount: '', displayBalance: ''}
    const [T1Field, setT1Field] = useState<TokenField>(emptyField)
    const [T2Field, setT2Field] = useState<TokenField>(emptyField)
    const { chainId, signer, getDisplayBalance, getPoolAddress} = useContext(ChainContext)
    const [isNewPair, setIsNewPair] = useState<boolean>(false)

    function handleAmountAChange(e: ChangeEvent<HTMLInputElement>){
        const cleansedDisplayAmountIn = e.target.value.replace(/[^0-9.]+/g, '')
        setT1Field((prevState: TokenField) => {return { ...prevState, displayAmount: cleansedDisplayAmountIn}})
    }

    function handleAmountBChange(e: ChangeEvent<HTMLInputElement>) {
        const cleansedDisplayAmountIn = e.target.value.replace(/[^0-9.]+/g, '')
        setT2Field((prevState: TokenField) => { return { ...prevState, displayAmount: cleansedDisplayAmountIn } })
    }

    function closeAndCleanUp() {
        onClose()
        setT1Field(emptyField)
        setT2Field(emptyField)
        setIsNewPair(false)
    }



    useEffect(() => {
        const updateDisplayAmountB = async function(addressA: string, addressB: string, amountA: BigNumber, dicimalsB: number){
            const poolAddress: string | undefined = await getPoolAddress(addressA, addressB)
            if(poolAddress !== undefined){
                const pool = new ethers.Contract(poolAddress, DexPool.abi, signer.provider)
                const reserve0 = await pool.reserve0()
                const reserve1 = await pool.reserve1()
                const [reserveA, reserveB] =  (addressA < addressB) ? [reserve0, reserve1] : [reserve1, reserve0]
                const amountB: BigNumber = amountA.mul(reserveB).div(reserveA)
                const displayAmountB: string = ethers.utils.formatUnits(amountB, dicimalsB)
                setT2Field((prevState: TokenField) => {return { ...prevState, displayAmount: displayAmountB}})

            }
        }
        if ((T1Field.displayAmount !== "") && (T1Field.address !== "") && (T2Field.address !== "") && (T1Field.address !== T2Field.address)) {
            const addressA = T1Field.address
            const addressB = T2Field.address
            const tokenAData: TokenData = loadTokenData(chainId, addressA)!
            const tokenBData: TokenData = loadTokenData(chainId, addressB)!
            let amountA: BigNumber
            try {
                amountA = ethers.utils.parseUnits(T1Field.displayAmount, tokenAData.decimals)
            } catch (e: any) {
                alert(`Invalid input: ${e.reason}`)
                return
            }
            updateDisplayAmountB(addressA, addressB, amountA, tokenBData.decimals)
        }

       
        if (T1Field.displayAmount === "") {
            setT2Field((prevState: TokenField) => { return { ...prevState, displayAmount: "" } })
        }
    }, [T1Field.address, T1Field.displayAmount, T2Field.address, chainId, signer, getPoolAddress])

    useEffect(() => {
        if (T1Field.address !== "" && T1Field.address === T2Field.address) {
            alert("Please select a different token")
            return
        }

        if (T1Field.address !== "" && T2Field.address !== "") {
            getPoolAddress(T1Field.address, T2Field.address).then((poolAddress: string | undefined) => {
                if (poolAddress === undefined) { setIsNewPair(true) } else { setIsNewPair(false) }
            })
        }

        if (T1Field.address !== "") {
            getDisplayBalance(T1Field.address).then((displayBalance: string) => {
                setT1Field((prevState: TokenField) => { return { ...prevState, displayBalance: displayBalance } })
            })
        }
        if (T2Field.address !== "") {
            getDisplayBalance(T2Field.address).then((displayBalance: string) => {
                setT2Field((prevState: TokenField) => { return { ...prevState, displayBalance: displayBalance } })
            })
        }
    }, [T1Field.address, T2Field.address, getDisplayBalance, getPoolAddress])


    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className={style.dialog} onClose={closeAndCleanUp}>
                <Dialog.Overlay className={style.overlay} />
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className={style.panelContainer}>
                        <Dialog.Panel className={style.panel}>
                            <div className={style.titleContainer}>
                                <Dialog.Title as="h3" className={style.title}>
                                    Add Liquidity to a Pool
                                </Dialog.Title>
                            </div>
                            <div>
                        


                                <div className={style.currencyContainer}>
                                    <div className={style.currencyInputContainer}>
                                        <input
                                            type='text'
                                            className={style.currencyInput}
                                            placeholder='0'
                                            onChange={handleAmountAChange}
                                            value={T1Field.displayAmount}
                                        />
                                    </div>
                                    <div className={style.currencySelector}>
                                        <TokenCombobox chainId={chainId} setTokenField={setT1Field} />
                                    </div>
                                </div>
                                <div className={style.currencyBalanceContainer}>
                                    <div className={style.currencyBalance}>
                                        {T1Field.displayBalance !== "" ? (<>{`Balance: ${T1Field.displayBalance}`}</>) : null}
                                    </div>
                                </div>
                           

                                <div className={style.currencyContainer}>
                                    <div className={style.currencyInputContainer}>
                                        <input
                                            type='text'
                                            className={style.currencyInput}
                                            placeholder='0'
                                            disabled={!isNewPair}
                                            onChange={handleAmountBChange}
                                            value={T2Field.displayAmount}
                                        />
                                    </div>
                                    <div className={style.currencySelector}>
                                        <TokenCombobox chainId={chainId} setTokenField={setT2Field} />
                                    </div>
                                </div>
                                <div className={style.currencyBalanceContainer}>
                                    <div className={style.currencyBalance}>
                                        {T2Field.displayBalance !== "" ? (<>{`Balance: ${T2Field.displayBalance}`}</>) : null}
                                    </div>
                                </div>
                              


                                <div className={style.messageContainer}>
                                    {isNewPair ? (<div>New Pool will be created. Please deposit tokens of equal value at current market prices.</div>) : null}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default AddLiquidityDialog
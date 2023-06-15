import { ethers } from "ethers"
import type { BigNumber } from "ethers"
import { useContext, useState, useEffect } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { ChainContext } from './ChainContext'
import TokenCombobox from './TokenCombobox'
import { loadTokenData, loadChainData } from '@/lib/load'
import { getAmountOut } from '@/lib/utilities'
import logo from '../../public/logo.svg'
import { swapStyle as style } from '@/styles/tailwindcss'
import DexPool from '../../hardhat/artifacts/contracts/DexPool.sol/DexPool.json'
import DexRouter from '../../hardhat/artifacts/contracts/DexRouter.sol/DexRouter.json'
import TxLog from "./TxLog"
import { resolve } from "path"


export interface TokenField {
    address: string,
    displayAmount: string,
    displayBalance: string
}

enum Status{
    Wait_For_Input,
    Need_Approval,
    Ready_To_Submit
}

export interface TxInfo{
    symbolIn: string,
    symbolOut: string,
    displayAmountIn: string,
    displayAmountOutRequested: string,
    displayAmountOutConfirmed: string,
    blockHash: string,
    transactionHash: string
}

const Swap = () => {

    const emptyField: TokenField = {address: '', displayAmount: '', displayBalance: ''}
    const [inField, setInField] = useState<TokenField>(emptyField)
    const [outField, setoutField] = useState<TokenField>(emptyField)
    const { chainId, currentAccount, routerAddress, signer, getDisplayBalance, getPoolAddress, getAllowance, sendApprovalTransaction } = useContext(ChainContext)
    const [status, setStatus] = useState<Status>(Status.Wait_For_Input)
    const emptyTxInfo: TxInfo={symbolIn: '', symbolOut: '', displayAmountIn: '', displayAmountOutRequested: '', displayAmountOutConfirmed: '',
                               blockHash: '', transactionHash: '' }
    const [txInfo, setTxInfo] = useState<TxInfo>(emptyTxInfo)
    const [isTxSubmittedOpen, setIsTxSubmittedOpen] = useState<boolean>(false)
    const [isTxConfirmedOpen, setIsTxConfirmedOpen] = useState<boolean>(false)



    function handleAmountInChange(e: ChangeEvent<HTMLInputElement>){
        const cleanseDisplayAmountIn = e.target.value.replace(/[^0-9.]/g, '')
        setInField((prevState: TokenField) => {return { ...prevState, displayAmount: cleanseDisplayAmountIn}})

    }

    async function handleApproval(e:MouseEvent<HTMLElement>) {
        const success: boolean = await sendApprovalTransaction(inField.address)
        if(success){
            setStatus(Status.Ready_To_Submit)
        }
    }
    async function handleSubmit(e: MouseEvent<HTMLElement>) {
        const success = await sendSwapTransaction()
        if(success){
            setInField(prevState => {return {...prevState, displayAmount: ''}})
            setStatus(Status.Wait_For_Input)
        }
    }

    async function sendSwapTransaction(): Promise<boolean>{
        const addressIn = inField.address
        const addressOut = outField.address
        const decimalsIn = loadTokenData(chainId, addressIn)!.decimals
        const decimalsOut = loadTokenData(chainId, addressOut)!.decimals
        const amountIn = ethers.utils.parseUnits(inField.displayAmount, decimalsIn)
        const amountOutMin = 0
        const to = currentAccount
        const deadline = Math.floor(Date.now() / 1000) + 120;
        const router = new ethers.Contract(routerAddress, DexRouter.abi, signer)
        try{
            const tx = await router.swapTokenPair(addressIn, addressOut, amountIn, amountOutMin,to, deadline)
            setTxInfo({
                symbolIn: loadTokenData(chainId, inField.address)!.symbol,
                symbolOut: loadTokenData(chainId, outField.address)!.symbol,
                displayAmountIn: inField.displayAmount,
                displayAmountOutRequested: outField.displayAmount,
                displayAmountOutConfirmed: '',
                blockHash: '',
                transactionHash: tx.Hash
            })
            setIsTxConfirmedOpen(true)

            await new Promise(resolve => setTimeout(resolve, 3000))

            const receipt = await tx.await()
            const poolInterface = new ethers.utils.Interface(DexPool.abi)
            const parsedLogs = []

            for(let log of receipt.logs){
                try{
                    parsedLogs.push(poolInterface.parseLog(log))
                }catch (e) {}
            }
            const SwapEvent = parsedLogs.filter((event: any) => event.name  === 'Swap')[0]
            const [sender, amount0In, amount1In, amount0Out, amount1Out] = SwapEvent.args
            const amountOut = amount0In.isZero() ? amount0Out : amount1Out
            const decimalsOut = loadTokenData(chainId, outField.address)!.decimals
            const displayAmountOut = ethers.utils.formatUnits(amountOut, decimalsOut)
            setTxInfo(prevState => {return { ...prevState, blockHash: receipt.blockHash, displayAmountOutConfirmed: displayAmountOut}})
            return true

        }catch(err){
            console.log('sendswaptransaction err',err)
            return false
        }
    }

    useEffect(() => {
        if((inField.displayAmount !== "") && (inField.address !== "") && (outField.address !== "") && (inField.address !== outField.address)){
            const updateDisplayAmountOut = async function (addressIn: string, addressOut: string, amountIn:BigNumber, decimalsOut: number) {
                const poolAddress: string | undefined = await getPoolAddress(addressIn, addressOut)
                if(poolAddress === undefined){
                    alert('Pool does not exist for this token pair')
                } else {
                    const pool = new ethers.Contract(poolAddress, DexPool.abi, signer.provider)
                    const reserve0 = await pool.reserve0()
                    const reserve1 = await pool.reserve1()
                    const [reserveIn, reserveOut] = addressIn < addressOut ? [reserve0, reserve1] : [reserve1, reserve0]
                    const amountOut = getAmountOut(amountIn, reserveIn, reserveOut)
                    const displayAmount: string = ethers.utils.formatUnits(amountOut, decimalsOut)
                    setoutField((prevState: TokenField) => {return {...prevState, displayAmount: displayAmount}})

                }
                
            }

            const checkAllowance = async function (addressIn: string, amountIn: BigNumber) {
                const allowance = await getAllowance(addressIn)
                if(allowance.lt(amountIn)){
                    setStatus(Status.Need_Approval)
                }else{
                    setStatus(Status.Ready_To_Submit)
                }
                
            }

            const addressIn = inField.address
            const addressOut = outField.address
            const decimalsIn = loadTokenData(chainId, addressIn)!.decimals
            const decimalsOut = loadTokenData(chainId, addressOut)!.decimals
            let amountIn: BigNumber

            try{
                amountIn = ethers.utils.parseUnits(inField.displayAmount, decimalsIn)
            } catch (e: any){
                alert(`Invalid input: ${e.reason}`)
                return
            }
            updateDisplayAmountOut(addressIn, addressOut, amountIn, decimalsOut)
            checkAllowance(addressIn, amountIn)
        }

        if (inField.displayAmount === ""){
            setoutField((prevState: TokenField) => {return {...prevState, displayAmount: ""}})
        }
    }, [inField.address, inField.displayAmount, outField.address, chainId, getPoolAddress, signer, getAllowance])

    useEffect(() => {
        if(inField.address != "" && inField.address === outField.address) {
            setTimeout(() => { alert("Please select a different token")}, 0)
            return
        }

        if(inField.address !== ""){
            getDisplayBalance(inField.address).then((displayBalance: string) => {
                setInField((prevState: TokenField) => {return { ...prevState, displayBalance: displayBalance}})
            })
        }

        if (outField.address !== "") {
            getDisplayBalance(outField.address).then((displayBalance: string) => {
                setInField((prevState: TokenField) => { return { ...prevState, displayBalance: displayBalance } })
            })
        }
    }, [inField.address, outField.address, getDisplayBalance, isTxConfirmedOpen])

    return (
        <div className={style.outerContainer}>
            <div className={style.container}>
                <div className={style.boxHeader}>
                    <div>Swap</div>
                </div>


                <div className={style.currencyContainer}>
                    {/*input field*/}
                    <input
                        type="text"
                        className={style.currencyInput}
                        placeholder='0'
                        value={inField.displayAmount}
                        onChange={handleAmountInChange}
                    />
                    <div className={style.currencySelectorContainer}>
                        <div className={style.currencySelector} style={{ zIndex: 1}}>
                            <TokenCombobox chainId={chainId} setTokenField={setInField}/>
                        </div>
                        <div className={style.currencyBalanceContainer}>
                            <div className={style.currencyBalance}>
                                { inField.displayBalance != "" ? <>{`Balance: ${inField.displayBalance}`}</>: null}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={style.arrowContainer}>
                    <div className={style.arrowBox}>
                        <ArrowDownIcon className={style.arrowIcon}/>
                    </div>
                </div>



                <div className={style.currencyContainer}>
                    <input
                        type="text"
                        className={style.currencyInput}
                        placeholder='0'
                        disabled = {true}
                        value={outField.displayAmount}
                    />
                    <div className={style.currencySelectorContainer} >
                        <div className={style.currencySelector} style={{ zIndex: 1 }}>
                            <TokenCombobox chainId={chainId} setTokenField={setoutField} />
                        </div>
                        <div className={style.currencyBalanceContainer}>
                            <div className={style.currencyBalance}>
                                {outField.displayBalance != "" ? <>{`Balance: ${outField.displayBalance}`}</> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {status === Status.Wait_For_Input ?
                        (<div className={style.inactiveConfirmButton}>
                            swap
                        </div>) : null}
                    {status === Status.Need_Approval ?
                        (<><div onClick={handleApproval} className={style.confirmButton}>
                            {`Allow to use your ${loadTokenData(chainId, inField.address)?.symbol} (one time approval)`}
                        </div>
                        <div className={style.inactiveConfirmButton}>
                            swap
                        </div></>) : null}
                    {status === Status.Ready_To_Submit ?
                        (<div onClick={handleSubmit} className={style.confirmButton}>
                            swap
                        </div>) : null}
                </div>

                <TxLog
                    title="Swap Transaction Submitted"
                    txURL={`${loadChainData(chainId)?.explorer}/tx/${txInfo.transactionHash}`}
                    show={isTxSubmittedOpen}
                    onClose={() => setIsTxSubmittedOpen(false)}
                />
                <TxLog
                    title="Transaction Confirmed!"
                    message={`${txInfo.displayAmountIn} ${txInfo.symbolIn} swapped to ${txInfo.displayAmountOutConfirmed} ${txInfo.symbolOut}`}
                    txURL={`${loadChainData(chainId)?.explorer}/tx/${txInfo.transactionHash}`}
                    show={isTxConfirmedOpen}
                    onClose={() => setIsTxConfirmedOpen(false)}
                />
        </div>
    </div>
    )
}

export default Swap
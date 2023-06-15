import { useState, createContext } from 'react'
import type React from 'react'
import { ethers, providers, BigNumber } from 'ethers'
import type { Signer, Contract} from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { loadChainData, loadTokenList, loadTokenData, loadChainLogo, loadContractData } from '@/lib/load'
import IERC20 from '../../hardhat/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import DexPool from '../../hardhat/artifacts/contracts/DexPool.sol/DexPool.json'
import DexFactory from '../../hardhat/artifacts/contracts/DexFactory.sol/DexFactory.json'

const Max_Int256 = BigNumber.from(2).pow(256).sub(1)

type Chain = any
export const ChainContext = createContext<Chain>({})

type ChainContextProviderProps = { children: React.ReactNode }
export const ChainContextProvider = ({ children }: ChainContextProviderProps) => {
    const [chainId, setChainId] = useState<number>()
    const [currentAccount, setCurrentAccount] = useState<string>()
    const [signer, setSigner] = useState<Signer>()
    const [factoryAddress, setFactoryAddress] = useState<string>()
    const [routerAddress, setRouterAddress] = useState<string>()

    async function connectWallet() {
        const provider = await detectEthereumProvider({ silent: true })
        if(provider){
            const ethersProvider = new providers.Web3Provider(provider)
            const accountList: string[] = await ethersProvider.listAccounts()
            if(accountList.length === 0 ) {
                alert('Please unlock MetaMask Wallet and/or connect to an account');
            }
            setCurrentAccount(ethers.utils.getAddress(accountList[0]))
            const network = await ethersProvider.getNetwork()
            const chainId = network.chainId
            setChainId(chainId)

            const signer = ethersProvider.getSigner()
            setSigner(signer)

            setFactoryAddress(loadContractData(chainId)?.factory)
            setRouterAddress(loadContractData(chainId)?.router)

            provider.on("chainChanged", () => {window.location.reload() })
            provider.on("accountsChanged", () => { window.location.reload() })

        }else{
            alert('please install MetaMask Wallet')
        }
    }

    async function getDisplayBalance(address: string): Promise<string>{
        const decimals: number = loadTokenData(chainId!, address)!.decimals
        const tokenContract: Contract = new ethers.Contract(address, IERC20.abi, signer!.provider)
        const balance: BigNumber =  await tokenContract.balanceOf(currentAccount)
        return ethers.utils.formatUnits(balance.toString(), decimals)
    }

    async function getPoolAddress(addressA: string, addressB: string): Promise<string | undefined> {
        const factoryContract: Contract = new ethers.Contract(factoryAddress!, DexFactory.abi, signer!.provider)
        const poolAddress: string = await factoryContract.getPool(addressA, addressB)
        if (poolAddress === ethers.constants.AddressZero) { return undefined } else { return poolAddress }

    }

    async function getAllowance(address: string): Promise<BigNumber>{
        const tokenContract: Contract = new ethers.Contract(address, IERC20.abi, signer!.provider)
        const allowance = await tokenContract.allowance(currentAccount, routerAddress)
        return allowance
    }

    async function sendApprovalTransaction(address: string): Promise<boolean>{
        const tokenContract: Contract = new ethers.Contract(address, IERC20.abi, signer)
        const tx = await tokenContract.approve(routerAddress, Max_Int256)
        const receipt = await tx.wait()
        return true
    }


    return (
        <ChainContext.Provider
            value={{
                chainId,
                currentAccount,
                connectWallet,
                signer,
                getDisplayBalance,
                getPoolAddress,
                getAllowance,
                sendApprovalTransaction,
                routerAddress
            }}
        >
            {children}
        </ChainContext.Provider>
    )

}
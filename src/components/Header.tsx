import Head from 'next/head'
import { ChainContext, ChainContextProvider } from '@/components/ChainContext'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/fun.gif'
import { headerStyle as style } from '@/styles/tailwindcss'
import { loadChainData, loadChainLogo } from '@/lib/load'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Header = (props: {page : string}) => {
    const { connectWallet, chainId, currentAccount } = useContext(ChainContext)
    const displayAddress = currentAccount ? `${currentAccount.slice(0,7)}...${currentAccount.slice(38)}` : ''
    let chainName: string | undefined
    if(chainId){
        if(loadChainData(chainId)){
            chainName = loadChainData(chainId)!.name
        } else {
            chainName ="Unsupported"
        }
    }
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <Image src={logo} alt='logo' height={60}/>
            </div>
            <div className={style.navContainer}>
            <Link href="/swap">
                <div className={props.page === 'swap' ? style.activeNavItem : style.inactiveNavItem}>
                    Swap
                </div>
            </Link>
            <Link href="/pool">
                <div className={props.page === 'pool' ? style.activeNavItem : style.inactiveNavItem}>
                    Pool
                </div>
            </Link>
            </div>
            <div className={style.buttonsContainer}>
                {(chainName === 'Unsupported') ? 
                    (<div className={style.chainContainer}>
                        <ExclamationTriangleIcon className={style.chainIcon}/>
                        <p>{chainName}</p>
                    </div>) : null
                }
                {(chainName !== 'Unsupported') && (chainName !== undefined) ?
                    (<div>
                        <Image src={loadChainLogo(chainId)} alt='chian logo' height={20} width={20} className={style.chainIcon}/>
                        <p>{chainName}</p>
                    </div>) : null
                }
                { currentAccount ? (
                    <div className={style.accountText}>{displayAddress}</div>
                ) : (
                <div onClick={() => connectWallet()} className={style.connect}>
                    <div className={style.connectText}>
                        Connect Wallet
                    </div>
                </div>)}
            </div>
        </div>
        
    )
}

export default Header
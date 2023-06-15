import Head from 'next/head'
import type {NextPage} from 'next'
import { ChainContext, ChainContextProvider } from '@/components/ChainContext'
import { useContext } from 'react'
import Header from '@/components/Header'
import Swap from '@/components/Swap'

const SwapPage: NextPage = () => {
    const { chainId, currentAccount }: any = useContext(ChainContext)
    return (
        <>
            <Head>
                <title>Dex Swap</title>
            </Head>
            <Header page = 'swap'/>
            <Swap />
        </>
    )
}

export default SwapPage
import Head from 'next/head'
import type { NextPage } from 'next'
import { ChainContext, ChainContextProvider } from '@/components/ChainContext'
import { useContext } from 'react'
import Header from '@/components/Header'
import Pool from '@/components/Pool'


const PoolPage: NextPage = () => {
    const { chainId, currentAccount }: any = useContext(ChainContext)
    return (
        <>
            <Head>
                <title>Dex Pool</title>
            </Head>
            <Header page = 'pool' />
            <Pool />
        </>
    )
}

export default PoolPage
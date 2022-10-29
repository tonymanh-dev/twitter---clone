import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import Darkmode from '../components/Darkmode'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="h-screen overflow-x-hidden dark:bg-primary-dark">
      <Head>
        <title>Twitter </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      {/* <div className="fixed bottom-10 right-10 ">
        <Darkmode />
      </div> */}

      <main className="px-4 ">
        <div className="grid h-screen grid-cols-1 divide-x sm:grid-cols-8 lg:grid-cols-12">
          <div className="grid hidden justify-end sm:col-span-1 sm:flex lg:justify-start xl:col-span-2">
            <Sidebar />
          </div>
          <div className="sm:col-span-7 md:col-span-6 lg:col-span-7 xl:col-span-6">
            <Feed tweets={tweets} />
          </div>
          <div className="hidden overflow-y-hidden md:col-span-1 md:flex lg:col-span-4 xl:col-span-4">
            <Rightbar />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()

  return {
    props: { tweets },
  }
}

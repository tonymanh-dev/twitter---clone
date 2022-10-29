import React, { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: tweetsProps }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps)

  const updateTweets = async () => {
    const updateToast = toast.loading('Updating...')

    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Tweets updated!', {
      id: updateToast,
    })
  }

  // console.log(tweets)

  return (
    <div className="">
      <div className="flex items-center justify-between px-4 pt-4">
        <h1 className="text-lg font-semibold text-primary-dark">Home</h1>

        <SparklesIcon className="h-5 w-5 cursor-pointer text-secondary-dark hover:text-primary" />
      </div>

      <div className="">
        <TweetBox setTweets={setTweets} />
      </div>
      <div
        onClick={updateTweets}
        className="w-full cursor-pointer py-3 text-center text-sm text-primary hover:bg-secondary-light"
      >
        <p>Show 363 Tweets</p>
      </div>

      {/* Feed */}
      <div className="pb-10">
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed

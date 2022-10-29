import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const Rightbar = () => {
  return (
    <div className="w-full pl-4 hidden lg:flex flex-col overflow-y-hidden">
      <div className="relative flex items-center my-4 ">
        <input
          type="text"
          placeholder="Search somethings"
          className="px-4 pl-12 focus:outline-primary focus:outline outline-offset-0 py-3 bg-secondary-light outline-none rounded-full w-full"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-secondary-dark inset-y-0 absolute h-full left-4" />
      </div>
      <div>
        <TwitterTweetEmbed tweetId="1585611821704265731" />
        <TwitterTweetEmbed tweetId="1582944965470359552" />
      </div>
    </div>
  )
}

export default Rightbar

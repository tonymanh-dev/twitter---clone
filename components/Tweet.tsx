import React, { useState, useEffect } from 'react'
import TimeAgo from 'react-timeago'
import {
  ChatBubbleOvalLeftIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

import { Tweet, Comment, CommentBody } from '../typings'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [isComment, setIsComment] = useState<Boolean>(false)
  const [cmtContent, setCmtContent] = useState<string>('')

  const { data: session } = useSession()

  const updateComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    updateComments()
  }, [])

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const cmtToast = toast.loading('Replying')

    const comment: CommentBody = {
      comment: cmtContent,
      tweetId: tweet._id,
      userName: session?.user?.name || 'No name',
      profileImage:
        session?.user?.image ||
        'https://api.tumblr.com/v2/blog/mischievousmoony.tumblr.com/avatar/512',
    }

    const result = await fetch('api/addComment', {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    toast.success('🦄', { id: cmtToast })

    setCmtContent('')
    setIsComment(false)
    updateComments()
  }

  return (
    <div className="flex border-t p-4">
      <div className="mr-2">
        <img src={tweet.profileImage} className="h-8 w-8 rounded-full" alt="" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center space-x-1">
          <p className="font-medium text-primary-dark">{tweet.userName}</p>
          <p className="text-sm text-gray-500">
            @{tweet.userName?.replace(/\s+/g, '').toLocaleLowerCase()}
          </p>

          <TimeAgo
            date={`${tweet._createdAt}`}
            className="text-xs text-gray-500"
          />
        </div>
        <div className="h-full w-full">
          <p className="pb-2 text-sm">{tweet.text}</p>
          <div className="relative w-full">
            {tweet.image && (
              <img
                src={tweet.image}
                alt=""
                className="h-full w-full rounded-xl "
              />
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-between py-2 md:w-4/5  [&>*]:cursor-pointer">
          <div
            onClick={() => setIsComment(!isComment)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary-dark hover:bg-blue-100 hover:text-primary"
          >
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary-dark hover:bg-green-100 hover:text-green-500">
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary-dark hover:bg-rose-100 hover:text-rose-500">
            <HeartIcon className="h-5 w-5" />
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary-dark hover:bg-blue-100 hover:text-primary">
            <ArrowUpTrayIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Comment box */}
        {session && isComment && (
          <div className="w-full transition-all">
            <form
              className="flex flex-1 "
              onSubmit={(e) => handleSubmitComment(e)}
            >
              <input
                value={cmtContent}
                onChange={(e) => setCmtContent(e.target.value)}
                type="text"
                placeholder="Tweet your reply"
                className="w-full bg-transparent p-2 text-sm outline-none"
              />
              <button
                disabled={!cmtContent}
                className="text-sm font-semibold text-primary disabled:opacity-75"
              >
                Reply
              </button>
            </form>
          </div>
        )}

        {/* Comments */}
        {comments?.length > 0 && (
          <div>
            {comments.map((cmt) => (
              <div key={cmt._id} className="relative flex pt-2">
                <hr className="absolute left-3 top-10 h-8 border-r border-gray-300" />

                <div className="mr-2">
                  <img
                    src={cmt.profileImage}
                    className="h-7 w-7 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center space-x-1">
                    <p className=" font-medium text-primary-dark">
                      {cmt.userName}
                    </p>
                    <p className="text-sm text-gray-500">
                      @{cmt.userName?.replace(/\s+/g, '').toLocaleLowerCase()}
                    </p>

                    <TimeAgo
                      date={cmt._createdAt}
                      className="text-xs text-gray-500"
                    />
                  </div>
                  <div className="h-full w-full">
                    <p className="pb-2 text-sm">{cmt.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tweet

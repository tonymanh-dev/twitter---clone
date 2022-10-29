import React, { useState, useRef } from 'react'
import {
  PhotoIcon,
  MagnifyingGlassCircleIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { TweetBody, Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [contents, setContents] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')
  const [photoBox, setPhotoBox] = useState<Boolean>(false)

  const photoRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()

  const handleAddPhoto = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!photoRef.current?.value) return

    setPhoto(photoRef.current.value)
    photoRef.current.value = ''
    setPhotoBox(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: contents,
      userName: session?.user?.name || 'No name',
      profileImage:
        session?.user?.image ||
        'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/canvas/2021/02/10/a558a6c8-f358-4e7a-a836-3a5f7d2fa2b5_bf3b50b7.jpg?itok=fuSKjNBE&v=1612941159',
      image: photo,
    }

    const result = await fetch('/api/addTweet', {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweet = await fetchTweets()
    setTweets(newTweet)

    toast.success('Tweet posted', {
      icon: '🚀',
    })

    return json
  }

  const handleTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()

    setContents('')
    setPhoto('')
    setPhotoBox(false)
  }

  return (
    <div className="border-b px-4">
      <div className="relative flex w-full py-4">
        <img
          src={
            session?.user?.image ||
            'https://api.tumblr.com/v2/blog/mischievousmoony.tumblr.com/avatar/512'
          }
          className="h-10 w-10 rounded-full "
        />
        <div className="w-full">
          <form className="flex flex-col items-center px-4 pt-2">
            <input
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder="What's happening?"
              className="w-full pb-4 outline-none"
            />
            <div className="relative  flex w-full items-center justify-between">
              <div className="flex space-x-3 text-primary [&>*]:h-5 [&>*]:w-5 [&>*]:cursor-pointer">
                <PhotoIcon onClick={() => setPhotoBox(!photoBox)} />
                <MagnifyingGlassCircleIcon />
                <FaceSmileIcon />
                <CalendarIcon />
                <MapPinIcon />
              </div>
              <button
                disabled={!contents}
                type="button"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-75"
                onClick={(e) => handleTweet(e)}
              >
                Tweet
              </button>
            </div>
          </form>
          {photoBox && (
            <form className="my-4 flex w-full rounded-full bg-blue-300 px-4">
              <input
                ref={photoRef}
                type="text"
                placeholder="Enter image URL"
                className="flex-1 bg-transparent p-2 text-sm text-white outline-none placeholder:text-gray-200"
              />
              <button
                onClick={(e) => handleAddPhoto(e)}
                className="text-sm font-semibold text-white"
              >
                Upload
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default TweetBox

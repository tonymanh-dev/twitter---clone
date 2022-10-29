import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  UserIcon,
  HomeIcon,
  CircleStackIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import { HiOutlineDotsCircleHorizontal, HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'
import Image from 'next/image'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className="fixed flex flex-col pt-4">
      <div className="relative mx-4 mb-6 h-8 w-8">
        <Image src="/logo.svg" layout="fill" objectFit="contain" />
      </div>

      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={HiOutlineMail} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={ListBulletIcon} title="Lists" />
      <SidebarRow
        Icon={UserIcon}
        onClick={session ? signOut : signIn}
        title={session ? session.user?.name || 'No name' : 'Sign in'}
      />
      <SidebarRow Icon={HiOutlineDotsCircleHorizontal} title="More" />
    </div>
  )
}

export default Sidebar

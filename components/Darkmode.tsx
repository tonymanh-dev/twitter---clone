import React, { useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const Darkmode = () => {
  const [isDarkmode, setIsDarkmode] = useState(false)
  const toggleDarkMode = () => {
    window.document.documentElement.classList.toggle('dark')
    setIsDarkmode((prev) => !prev)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center cursor-pointer trasition-all text-primary-dark dark:text-primary-light"
    >
      {isDarkmode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6 " />
      )}
    </button>
  )
}

export default Darkmode

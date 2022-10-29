import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  onClick?: () => {}
}

const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex max-w-fit cursor-pointer items-center space-x-2 rounded-full py-4 px-4 text-lg text-primary-dark transition-all hover:bg-secondary-light hover:text-primary dark:text-primary-light xl:py-3"
    >
      <Icon className="h-6 w-6" />
      <span className="hidden xl:block">{title}</span>
    </div>
  )
}

export default SidebarRow

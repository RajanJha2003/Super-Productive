import { topSidebarLinks } from '@/lib/utils'
import React from 'react'
import SidebarLink from './SidebarLink'

const Top = () => {
  return (
    <div className='flex flex-col items-center gap-3'>
        {
            topSidebarLinks.map((link,i)=>(
                <SidebarLink key={`link_${i}`}
                 icon={link.Icon}
                  hoverTextKey={link.hoverTextKey}
                  href={link.href}
                  include={link.include}
                  />
            ))
        }

    </div>
  )
}

export default Top
import React from 'react'
import LargeNav from './LargeNav'

const Nav = () => {
  return (
    <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
       <LargeNav />
    </nav>
  )
}

export default Nav
"use client";

import { useIsVisible } from '@/hooks/useIsVisible'
import { homePageHeaderLinks } from '@/lib/constants';
import React from 'react'
import HeaderLink from './HeaderLink';

const Header = () => {
    const {isVisible,ref}=useIsVisible();
  return (
    <header className='flex flex-col items-center mt-20 w-full relative isolate group'>
        <h1 ref={ref} className='font-bold text-5xl sm:text-6xl lg:text-8xl max-w-2xl text-center'>
            Your Ultimate Productive App
        </h1>
        <div className='w-full flex flex-wrap items-center justify-center mt-12 gap-2 sm:gap-4'>
            {
                homePageHeaderLinks.map((link,i)=>(
                    <HeaderLink key={i} Icon={link.Icon} href={link.href} title={link.title} />
                ))
            }

        </div>

    </header>
  )
}

export default Header
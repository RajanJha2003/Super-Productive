"use client";

import { AppleLogo } from '@/components/svg/AppleLogo'
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { Button, buttonVariants } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { navLinks } from '@/lib/constants';
import { scrollToHash } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const LargeNav = () => {
  return (
    <div className='container md:flex py-4 max-w-screen-2xl items-center justify-between hidden'>
        <div className='flex items-center'>
            <Button onClick={()=>{
                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                })
            }} className='w-fit bg-transparent text-secondary-background hover:bg-transparent flex items-center gap-2 hover:scale-105 transition-transform duration-200'>
                <AppleLogo className='w-10 h-10' />
                <p className='text-2xl font-semibold'>Super <span className='text-primary'>Productive</span></p>

            </Button>
            <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">
                Product
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                  {navLinks.map((link, i) => (
                    <div key={i}>
                      <Button
                        onClick={() => {
                          scrollToHash(link.href);
                        }}
                        className="w-full text-left bg-transparent text-secondary-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {link.title}
                      </Button>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        </div>
        <div className='flex items-center gap-4'>
            <div className='flex items-center gap-4'>
                <Link href="/sign-in" className='border-b inline-block border-transparent hover:border-primary duration-200 transition-colors '>
                Log in
                </Link>
                <Link className={`${buttonVariants({
                    variant:"default"
                })}`} href={"/sign-up"} >
                Sign up</Link>

            </div>
            <div className='flex items-center gap-2'>
            <ThemeSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />


            </div>

        </div>

    </div>
  )
}

export default LargeNav
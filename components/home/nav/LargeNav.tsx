"use client";

import { AppleLogo } from '@/components/svg/AppleLogo'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
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
                        <NavigationMenuTrigger className='text-lg'>
                            Product

                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px] gap-3 p-4 md:grid-cols-2'>
                                 

                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </div>

    </div>
  )
}

export default LargeNav
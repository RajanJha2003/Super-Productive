import ActiveLink from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { LogOutIcon, Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl'
import React from 'react'

const Bottom = () => {

    const t=useTranslations("SIDEBAR");

    const logoutHandler=()=>{

    }
  return (
    <div className='flex flex-col gap-4'>
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger tabIndex={1}>
                <Button onClick={logoutHandler} variant="ghost" size={"icon"}>
                    <LogOutIcon />

                </Button>

            </HoverCardTrigger>

        </HoverCard>
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger tabIndex={1}>
                <ActiveLink include='settings' variant={"ghost"} size={"icon"} href='/dashboard/settings'> 
                <Settings2 />

                </ActiveLink>
            </HoverCardTrigger>
            <HoverCardContent align='start'>
                <span>
                    {
                        t("MAIN.SETTINGS_HOVER")
                    }
                </span>

            </HoverCardContent>

        </HoverCard>

    </div>
  )
}

export default Bottom
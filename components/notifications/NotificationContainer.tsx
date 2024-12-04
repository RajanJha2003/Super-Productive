'use client'

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import { Notification } from '@prisma/client';
import { useTranslations } from 'next-intl';
interface Props{
  userId: string;
}

const NotificationContainer = ({userId}: Props) => {
    const [open, setOpen] = useState(false);
    const t = useTranslations("NOTIFICATIONS");

    const [unseenNotifications, setUnseenNotifications] = useState<Notification[]>([]);



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <HoverCard openDelay={250} closeDelay={250}>
        <PopoverTrigger asChild>
          <HoverCardTrigger>
            <Button variant={"ghost"} size={"icon"} className='w-6 h-6 sm:h-9 sm:w-9 relative'>
              <Bell size={16} />
              {
                unseenNotifications.length!==0 && (
                  <div className='absolute text-white top-0 right-0 bg-primary rounded-full border border-border w-3.5 h-3.5 sm:w-4 sm:h-4 flex justify-center items-center text-xs'>
                    <p>
                      {
                        unseenNotifications.length>9 ? '9+': unseenNotifications.length
                      }
                    </p>


                  </div>
                )
              }

            </Button>
          </HoverCardTrigger>
          
        </PopoverTrigger>
        <HoverCardContent>
          <span>
            {
              t("TITLE")
            }
          </span>
        </HoverCardContent>
        <PopoverContent side='bottom' align='end' className='w-fit max-w-[300px] sm:max-w-[390px] p-2 sm:p-4'>

         
        </PopoverContent>


      </HoverCard>
      
    </Popover>
  )
}

export default NotificationContainer
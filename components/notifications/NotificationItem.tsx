"use client"

import { useToast } from '@/hooks/use-toast'
import { useCreateNotifyItemDay } from '@/hooks/useCreateNotifyItemDay'
import { useTruncateText } from '@/hooks/useTrancateText'
import { UserNotification } from '@/types/extended'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { UserAvatar } from '../ui/user-avatar'
import { BellDot } from 'lucide-react'


interface Props{
  notify:UserNotification
}

const NotificationItem = ({notify:{
    notifyCreator:{image,username},
    clicked,
    createdDate,
    workspace,
    newUserRole,
    taskId,
    mindMapId,
    notifyType,
    id
}}:Props) => {
    const name=useTruncateText(username,20);
    const m=useTranslations("MESSAGES");
    const queryClient=useQueryClient();
    const format=useFormatter();

    const datTime=new Date(createdDate);
    const now=new Date();

    const {toast}=useToast();

    const {link,textContent}=useCreateNotifyItemDay(notifyType,newUserRole,workspace,taskId,mindMapId);

    const {mutate:updateAlltoClickStatus}=useMutation({
        mutationFn:async()=>{
          await axios.post("/api/notifications/set-click/by-id",{id});
        },
        onMutate:async()=>{
          //@ts-ignore
          await queryClient.cancelQueries(["getUserNotifications"]);
          const previousNotifications=queryClient.getQueryData<UserNotification[]>(["getUserNotifications"]);
          const checkedPreviousNotifications=previousNotifications && previousNotifications.length>0 ? previousNotifications:[];
  
          const updateNotifications=checkedPreviousNotifications.map((notify)=>{
            if(notify.id===id){
                return{
                    ...notify,clicked:true
                  }
            }else{
                return notify;
            }
          })
  
          queryClient.setQueryData(["getUserNotifications"],updateNotifications);
          return {checkedPreviousNotifications};
  
         
        },
        onError:(err:AxiosError,_,context)=>{
          queryClient.setQueryData(["getUserNotifications"],context?.checkedPreviousNotifications);
  
          toast({
            title:m("ERRORS.CANT_UPDATE_SEEN_NOTIFY"),
            variant:"destructive"
  
          })
        },
        onSettled:()=>{
          //@ts-ignore
          queryClient.invalidateQueries(["getUserNotifications"]);
        },
        mutationKey:["updateAlltoClickStatus"]
  
      })


  return (
    <Link href={link} onClick={()=>{
        !clicked && updateAlltoClickStatus()
    }}>
        <div className='flex gap-4'>
            <div >
                <UserAvatar className='w-10 h-10 ' size={12} />
            </div>
            <div className='flex gap-4'>
                <div className='w-full text-sm flex flex-col gap-1'>
                    <p>
                        <span className='font-bold'>{name}</span>
                        {textContent}
                    </p>
                    <p className={`text-xs transiton-colors duration-200 ${clicked?"text-muted-foreground":"text-primary font-bold"}`}>
                        {format.relativeTime(datTime,now)}
                    </p>

                </div>
                {
                    !clicked && (
                        <div >
                    <div className='h-6 w-6 text-primary'>
                        <BellDot size={16} />
                    </div>
                        </div>
                    )
                }

            </div>

        </div>
    </Link>
  )
}

export default NotificationItem
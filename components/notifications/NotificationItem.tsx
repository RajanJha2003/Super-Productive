"use client"

import { useToast } from '@/hooks/use-toast'
import { useTruncateText } from '@/hooks/useTrancateText'
import { UserNotification } from '@/types/extended'
import { useQueryClient } from '@tanstack/react-query'
import { useFormatter, useTranslations } from 'next-intl'
import React from 'react'


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
    

  return (
    <div>NotificationItem</div>
  )
}

export default NotificationItem
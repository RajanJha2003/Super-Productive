"use client";

import { useToast } from '@/hooks/use-toast';
import { Workspace } from '@prisma/client'
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'

interface Props{
    workspace:Workspace
}

const LeaveWorkspace = ({workspace:{id,name}}:Props) => {

    const [open,setOpen]=useState(false);
    const t=useTranslations("LEAVE_FROM_WORKSPACE");
    const m=useTranslations("MESSAGES");

    const {toast}=useToast();
    const router=useRouter();


    const {mutate:deleteWorkspace,isPending}=useMutation({
      mutationFn:async()=>{
        await axios.post(`/api/workspace/leave`,{id})
            
      },
      onError:(err:AxiosError)=>{
         const error=err?.response?.data ? err.response.data :"ERRORS.DEFAULT";
         toast({
             title:m(error),
             variant:"destructive"
         })

      },
      onSuccess:async()=>{
         toast({
             title:m("SUCCESS.LEAVE_FROM_WORKSPACE"),
         })

         router.push("/dashboard");
         router.refresh();
      },
      mutationKey:["leaveFromWorkspace",id]
})


  return (
    <div>LeaveWorkspace</div>
  )
}

export default LeaveWorkspace
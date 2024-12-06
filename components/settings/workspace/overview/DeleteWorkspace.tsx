
'use client'

import { useToast } from '@/hooks/use-toast'
import { SettingsWorkspace } from '@/types/extended'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface Props{
    workspace: SettingsWorkspace
}

const DeleteWorkspace = ({workspace:{id,name}}: Props) => {
    const t=useTranslations("EDIT_WORKSPACE.DELETE");
    const {toast}=useToast();
    const m=useTranslations("MESSAGES");
    const lang=useLocale();
    const router=useRouter();

    const deleteWorkspaceSchema=z.object({
        workspaceName:z.string().refine((workspaceName)=>workspaceName===name,"SCHEMA.WORKSPACE.WRONG_NAME")
    })


    type DeleteWorkspaceSchema=z.infer<typeof deleteWorkspaceSchema>;

    const form=useForm<DeleteWorkspaceSchema>({
        resolver:zodResolver(deleteWorkspaceSchema),
        defaultValues:{
            workspaceName:""
        }
    })


    const {mutate:deleteWorkspace,isPending}=useMutation({
             mutationFn:async(formData:DeleteWorkspaceSchema)=>{
                    const {data}=(await axios.post("/api/workspace/delete/workspace",{
                        id,
                        workspaceName:formData.workspaceName
                    }))
                    return data;
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
                    title:m("SUCCESS.DELETED_WORKSPACE_INFO"),
                })

                router.push("/dashboard/settings");
                router.refresh();
             },
             mutationKey:["deleteWorkspace"]
    })

    const onSubmit=(formData:DeleteWorkspaceSchema)=>{
         deleteWorkspace(formData);
    }

  return (
    <div>DeleteWorkspace</div>
  )
}

export default DeleteWorkspace
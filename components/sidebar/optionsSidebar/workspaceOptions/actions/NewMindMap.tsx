"use client"

import { Button } from '@/components/ui/button'
import { LoadingState } from '@/components/ui/loadingState'
import { useNewMindMap } from '@/hooks/useNewMindMap'
import { useNewTask } from '@/hooks/useNewTask'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props{
    workspaceId: string
}

const NewMindMap = ({workspaceId}: Props) => {

    const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
         const {newMindMap,isPending}=useNewMindMap(workspaceId);
  return (
    <Button disabled={isPending} onClick={()=>{
      newMindMap();
    }} variant={"ghost"} size={"sm"} className='justify-start items-center gap-2'>
           <Plus size={16} />
           {
            isPending?<LoadingState />:t("ADD_MIND_MAP")
           }


    </Button>
  )
}

export default NewMindMap
"use client"

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props{
    workspaceId: string
}

const NewTask = ({workspaceId}: Props) => {

    const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS");

  return (
    <Button variant={"ghost"} size={"sm"} className='justify-start items-center gap-2'>
           <Plus size={16} />
           {
            t("ADD_TASK")
           }


    </Button>
  )
}

export default NewTask
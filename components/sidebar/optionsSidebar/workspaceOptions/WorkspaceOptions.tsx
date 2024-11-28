"use client"
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props{
    workspaceId:string
}

const WorkspaceOptions = ({workspaceId}:Props) => {

  const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS")
  return (
    <div>
    <div>
    <p>
      {
        t("SHORTCUTS")
      }
    </p>
    {
      
    }
    </div>

    </div>
  )
}

export default WorkspaceOptions
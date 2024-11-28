"use client"
import { WorkspaceShortcuts } from '@/types/extended'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import {WorkspaceOption} from './WorkspaceOption'
import { PencilRuler } from 'lucide-react'

interface Props{
    workspaceId:string
}

const WorkspaceOptions = ({workspaceId}:Props) => {




  const { data: workspaceShortcuts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data as WorkspaceShortcuts;
    },
    queryKey: ["getWrokspaceShortcuts", workspaceId],
  });

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
      !isLoading && workspaceShortcuts && (
        <div>
          <WorkspaceOption>
            <PencilRuler size={16} />
            {
              t("TASKS")
            }
          </WorkspaceOption>
        </div>
      )
    }
    </div>

    </div>
  )
}

export default WorkspaceOptions
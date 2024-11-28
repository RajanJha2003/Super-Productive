"use client"
import { WorkspaceShortcuts } from '@/types/extended'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import {WorkspaceOption} from './WorkspaceOption'
import { PencilRuler, Workflow } from 'lucide-react'
import NewTask from './actions/NewTask'
import NewMindMap from './actions/NewMindMap'

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
          <WorkspaceOption workspaceId={workspaceId} defaultName={"Test"} 
          href='tasks/task'
          fields={workspaceShortcuts.tasks}
          >
            <PencilRuler size={16} />
            {
              t("TASKS")
            }
          </WorkspaceOption>
          <WorkspaceOption workspaceId={workspaceId} defaultName={t("DEFAULT_NAME")} 
          href='mind-maps/mind-map'
          fields={workspaceShortcuts.mindMaps}
          >
            <Workflow size={16} />
            {
              t("MIND_MAPS")
            }
          </WorkspaceOption>
        </div>
      )
    }
    </div>

    <div>
    <p className='text-xs sm:text-sm uppercase text-muted-foreground '>
      {
        t("ACTIONS")
      }
    </p>

    <div className='flex flex-col gap-2 w-full mt-2'>
      <NewTask workspaceId={workspaceId} />
      <NewMindMap workspaceId={workspaceId} />

    </div>
    </div>

    </div>
  )
}

export default WorkspaceOptions
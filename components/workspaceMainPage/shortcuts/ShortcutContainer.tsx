"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { useNewMindMap } from '@/hooks/useNewMindMap';
import { useNewTask } from '@/hooks/useNewTask'
import { ExtendedWorkspace } from '@/types/extended';
import { UserPermission } from '@prisma/client';
import React from 'react'
import PermissionIndicator from './permissionIndicator/PermissionIndicator';


interface Props{
    workspace:ExtendedWorkspace;
    userRole:UserPermission| null;
}

const ShortcutContainer = ({workspace,userRole}:Props) => {
    const {newTask,isPending:isNewTaskLoading}=useNewTask(workspace.id);
    const {newMindMap,isPending:isNewMindMapLoading}=useNewMindMap(workspace.id);
  return (
    <ScrollArea className='w-full'>
      <div className='flex w-max space-x-4 pb-4 mt-4'>
        <PermissionIndicator userRole={userRole} workspaceName={workspace.name} />

      </div>

    </ScrollArea>
  )
}

export default ShortcutContainer
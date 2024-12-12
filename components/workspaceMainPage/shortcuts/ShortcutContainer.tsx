"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { useNewMindMap } from '@/hooks/useNewMindMap';
import { useNewTask } from '@/hooks/useNewTask'
import { ExtendedWorkspace } from '@/types/extended';
import { UserPermission } from '@prisma/client';
import React from 'react'
import PermissionIndicator from './permissionIndicator/PermissionIndicator';
import {ShortcutContainerLinkItem} from './ShortcutContainerLinkItem';
import { MessagesSquare, PencilRuler, Workflow } from 'lucide-react';
import LeaveWorkspace from './leaveWorkspace/LeaveWorkspace';
import {ShortcutContainerBtnItem} from './ShortcutContainerBtnItem';


interface Props{
    workspace:ExtendedWorkspace;
    userRole:UserPermission| null;
}

const ShortcutContainer = ({workspace,userRole}:Props) => {
    const {newTask,isPending:isNewTaskLoading}=useNewTask(workspace.id);
    const {newMindMap,isPending:isNewMindMapLoading}=useNewMindMap(workspace.id);
  return (
    <ScrollArea className="w-full">
  <div className="flex flex-wrap w-full space-x-4 space-y-4 pb-4 mt-4">
    <PermissionIndicator userRole={userRole} workspaceName={workspace.name} />
    
    <ShortcutContainerLinkItem
      userRole={userRole}
      Icon={MessagesSquare}
      title="Group chat"
      href={`/dashboard/workspace/${workspace.id}/chat/${workspace.conversation.id}`}
    />
    
    <ShortcutContainerBtnItem
      userRole={userRole}
      Icon={PencilRuler}
      title="New task"
      isLoading={isNewTaskLoading}
      onClick={newTask}
    />
    
    <ShortcutContainerBtnItem
      userRole={userRole}
      Icon={Workflow}
      title="New mind map"
      isLoading={isNewMindMapLoading}
      onClick={newMindMap}
    />
    
    {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
  </div>
</ScrollArea>

  )
}

export default ShortcutContainer
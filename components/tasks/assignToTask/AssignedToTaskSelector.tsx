"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LoadingState } from '@/components/ui/loadingState';
import { useUserEditableWorkspaces } from '@/context/UserEditableWorkspaces';
import { cn } from '@/lib/utils';
import { UsersAssignedToTaskInfo } from '@/types/extended';
import { useQuery } from '@tanstack/react-query';
import { User2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {CommandContainer} from './CommandContainer';

interface Props {
    className?: string;
    plusIconSize?: number;
    dropdownSizeOffset?: number;
    workspaceId: string;
    taskId: string;
  }

const AssignedToTaskSelector = ({className,plusIconSize,dropdownSizeOffset,workspaceId,taskId}:Props) => {
    const t = useTranslations("TASK.ASSIGNMENT");
    const [canEdit, setCanEdit] = useState(false);
  
    const {
      data: editableWorkspaces,
      isError: isErrorGettingWorkspaces,
      isLoading: isGettingWorkspaces,
      refetch: refetchWorkspaces,
    } = useUserEditableWorkspaces();
  
    useEffect(() => {
      if (editableWorkspaces) {
        const inThisWorkspace = editableWorkspaces.some(
          (workspace) => workspace.id === workspaceId
        );
        setCanEdit(inThisWorkspace);
      }
    }, [editableWorkspaces, workspaceId]);
    const {
      data: assignedUsersInfo,
      isLoading: isLoadingInfo,
      isError: isErrorGettingAssignedUser,
      refetch: refetchAssigned,
    } = useQuery({
      queryFn: async () => {
        const res = await fetch(
          `/api/assigned_to/tasks/get?workspaceId=${workspaceId}&taskId=${taskId}`
        );
  
        if (!res.ok) return {} as UsersAssignedToTaskInfo;
  
        const data = await res.json();
        return data as UsersAssignedToTaskInfo;
      },
  
      queryKey: ["getAssignedToTaskInfo", taskId],
    });
  
    const router = useRouter();
 
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className={cn(`w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5`,className)} 
            
            variant={"outline"} size={"sm"}>
                <User2 size={plusIconSize} className='mr-1' />
                <span>{t("TRIGGER")}</span>

                </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={dropdownSizeOffset && dropdownSizeOffset}>
                   {
                    isLoadingInfo || (
                        isGettingWorkspaces && (
                            <div className='p-3 flex justify-center items-center '>
                                <LoadingState />

                            </div>
                        )
                    )
                   }
                   {
                    !isLoadingInfo && assignedUsersInfo && !isGettingWorkspaces && (
                        <CommandContainer 
                        users={assignedUsersInfo.subscribers}
                        taskId={taskId}
                        workspaceId={workspaceId}
                        canEdit={canEdit}
                        />
                    )
                   }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AssignedToTaskSelector
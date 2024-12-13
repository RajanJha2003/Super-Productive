"use client";

import { useUserEditableWorkspaces } from '@/context/UserEditableWorkspaces';
import { UsersAssignedToTaskInfo } from '@/types/extended';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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
    <div>AssignedToTaskSelector</div>
  )
}

export default AssignedToTaskSelector
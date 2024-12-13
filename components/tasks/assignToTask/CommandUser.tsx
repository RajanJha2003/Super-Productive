import { useToast } from '@/hooks/use-toast';
import { AssignedToTaskUser } from '@/types/extended'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'


interface Props{
    user:AssignedToTaskUser;
    taskId:string;
    workspaceId:string;
    canEdit:boolean;
}

const CommandUser = ({user,taskId,workspaceId,canEdit}:Props) => {
    const [isActiveUser, setIsActiveUser] = useState(
        user.user.assignedToTask.length === 1 ? true : false
      );
    const m = useTranslations("MESSAGES");
    const queryClient = useQueryClient();
    const { toast } = useToast();
  
    const { mutate: handleTaskAssignment } = useMutation({
      mutationFn: async () => {
        await axios.post(`/api/assigned_to/tasks/assign`, {
          taskId,
          workspaceId,
          assignToUserId: user.user.id,
        });
      },
      onMutate: async () => {
        //@ts-ignore
        await queryClient.cancelQueries(["getAssignedToTaskInfo"]);
  
        setIsActiveUser((prev) => !prev);
      },
      onError: (err: AxiosError) => {
        setIsActiveUser((prev) => !prev);
        const error = err?.response?.data ? err.response.data : "ERRORS_DEFAULT";
  
        toast({
          title: m(error),
          variant: "destructive",
        });
      },
      onSettled: () => {
        //@ts-ignore
        queryClient.invalidateQueries(["getAssignedToTaskInfo", taskId]);
      },
      mutationKey: ["handleTaskAssignment", taskId],
    });
  

  return (
    <div>CommandUser</div>
  )
}

export default CommandUser
"use client";

import { useUserEditableWorkspaces } from '@/context/UserEditableWorkspaces';
import { useToast } from '@/hooks/use-toast';
import { useChangeCodeToEmoji } from '@/hooks/useChangeCodeToEmoji';
import { Task, Workspace } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { DateRange } from "react-day-picker";


interface Props{
  userId:string;
}

const AddTaskShortcut = ({userId}:Props) => {

  const [open, setOpen] = useState(false);
  const m = useTranslations("MESSAGES");
  const t = useTranslations("TASK_SHORTCUT");

  const {
    data: workspaces,
    isError,
    isLoading: isGettingWorkspaces,
    refetch,
  } = useUserEditableWorkspaces();

  const queryclient = useQueryClient();

  const [currentTab, setCurrentTab] = useState<"main" | "workspaces">("main");
  const [selectedEmoji, setSelectedEmoji] = useState("1f9e0");
  const renderedEmoji = useChangeCodeToEmoji(selectedEmoji);

  const { toast } = useToast();
  const router = useRouter();

  const [newTaskLink, setNewTaskLink] = useState<null | string>(null);

  const [activeWorkspace, setActiveWorkspace] = useState<null | Workspace>(
    null
  );

  useEffect(() => {
    if (workspaces) setActiveWorkspace(workspaces[0]);
  }, [workspaces]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [title, setTitle] = useState("");

  const selectedDateHandler = (date: DateRange | undefined) => {
    setDate(date);
  };

  const changeTitleHandler = (title: string) => {
    setTitle(title);
  };

  const selectEmojiHandler = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const changeTabHandler = (tab: "main" | "workspaces") => {
    setCurrentTab(tab);
  };

  const onSelectActiveWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    setCurrentTab("main");
  };

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;

    if (!open) {
      timeOutId = setTimeout(() => {
        setCurrentTab("main");
        setNewTaskLink(null);
      }, 200);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [open]);

  const { mutate: newShortTask, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/task/create_short_task`, {
        workspaceId: activeWorkspace?.id,
        icon: selectedEmoji,
        title,
        date,
      });

      return data as Task;
    },

    onSuccess: async (data: Task) => {
      //@ts-ignore
      await queryclient.refetchQueries(["getCalendarItems", userId]);

      toast({
        title: m("SUCCES.TASK_ADDED"),
      });

      setNewTaskLink(
        `/dashboard/workspace/${data.workspaceId}/tasks/task/${data.id}/edit`
      );
      setTitle("");
      setSelectedEmoji("1f9e0");
      setActiveWorkspace(workspaces ? workspaces[0] : null);
      setDate({
        from: undefined,
        to: undefined,
      });
      router.refresh();
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    onMutate: () => {},
    mutationKey: ["newShortTask"],
  });
  

  return (
    <div>AddTaskShortcut</div>
  )
}

export default AddTaskShortcut
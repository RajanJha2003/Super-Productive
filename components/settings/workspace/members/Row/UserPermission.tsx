"use client";

import React from 'react'
import { UserPermission as UserPermissionType } from "@prisma/client";
import { SubscriptionUser } from '@/types/extended';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useChangeCodeToEmoji } from '@/hooks/useChangeCodeToEmoji';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Props {
    userRole: UserPermissionType;
    user: {
      id: string;
      image?: string | null | undefined;
      username: string;
    };
    workspaceId: string;
    onSetworkspacesubscribers: React.Dispatch<
      React.SetStateAction<SubscriptionUser[]>
    >;
  }

const UserPermission = ({userRole,user,workspaceId,onSetworkspacesubscribers}:Props) => {
  
    const { toast } = useToast();
    const router = useRouter();
    const t = useTranslations("PERMISSIONS");
    const m = useTranslations("MESSAGES");
    const userRoleEmojis = useChangeCodeToEmoji(
      "1f432",
      "1f60e",
      "1f920",
      "1f913"
    );
    const { mutate: editUserRole, isPending } = useMutation({
      mutationFn: async (role: UserPermissionType) => {
        const { data } = (await axios.post("/api/workspace/users/edit_role", {
          userId: user.id,
          workspaceId,
          newRole: role,
        })) as AxiosResponse<UserPermissionType>;
        return data;
      },
      onError: (err: AxiosError) => {
        const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";
  
        toast({
          title: m(error),
          variant: "destructive",
        });
      },
      onSuccess: async (res: UserPermissionType) => {
        onSetworkspacesubscribers((current) =>
          current.map((currentSubscribers) => {
            if (currentSubscribers.user.id === user.id) {
              return {
                ...currentSubscribers,
                userRole: res,
              };
            }
            return currentSubscribers;
          })
        );
        router.refresh();
      },
      mutationKey: ["editUserRole"],
    });
  
    return (
    <div>UserPermission</div>
  )
}

export default UserPermission
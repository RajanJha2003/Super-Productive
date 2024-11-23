"use client";

import { useToast } from '@/hooks/use-toast';
import { WorkspaceSchema, workspaceSchema } from '@/schema/workSpaceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props{
    onSetOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWorkspaceForm = ({onSetOpen}:Props) => {

    const t = useTranslations("AUTH.NEW_WORKSPACE");
    const m = useTranslations("MESSAGES");
    const { toast } = useToast();
    const form = useForm<WorkspaceSchema>({
      resolver: zodResolver(workspaceSchema),
      defaultValues: {
        workspaceName: "",
      },
    });
    const [uploadError, setUploadError] = useState(false);
  return (
    <div>AddWorkspaceForm</div>
  )
}

export default AddWorkspaceForm
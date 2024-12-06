import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { SettingsWorkspace } from '@/types/extended';
import { useTranslations } from 'next-intl';

import React from 'react'
import MembersTable from './MembersTable';


interface Props{
    workspaceId:string;
    workspace:SettingsWorkspace
}

const MembersCard = ({workspaceId,workspace}:Props) => {
    const t=useTranslations("EDIT_WORKSPACE.MEMBERS")
  return (
   <Card className='bg-background border-none shadow-none'>
    <CardHeader>
        <h1 className='text-2xl font-semibold leading-none tracking-tight'>{t("TITLE")}</h1>
        <CardDescription className='text-base break-words'>{t("DESC")}</CardDescription>
    </CardHeader>
    <CardContent>
        <MembersTable workspaceId={workspaceId} workspace={workspace} />
    </CardContent>

   </Card>
  )
}

export default MembersCard
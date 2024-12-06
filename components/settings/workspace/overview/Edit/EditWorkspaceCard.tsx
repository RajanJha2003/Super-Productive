import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SettingsWorkspace } from '@/types/extended'
import { useTranslations } from 'next-intl'
import React from 'react'
import EditWorkspaceImage from './EditWorkspaceImage'


interface Props{
    workspace:SettingsWorkspace
}

const EditWorkspaceCard = ({workspace}:Props) => {
    const t=useTranslations("EDIT_WORKSPACE");

  return (
    <Card className='bg-background border-none shadow-none'>
        <CardHeader>
            <h1 className='text-2xl font-semibold leading-none tracking-tight'>{t("TITLE")}</h1>
            <CardDescription className='text-base break-words'>
                {t("DESC")}
            </CardDescription>

        </CardHeader>
        <CardContent className='space-y-4'>
            <EditWorkspaceImage workspace={workspace} />





        </CardContent>

    </Card>
  )
}

export default EditWorkspaceCard
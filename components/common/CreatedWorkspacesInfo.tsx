import { MAX_USER_WORKSPACES } from '@/lib/options';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react'

interface Props{
    createNumber:number;
    className?:string;
}

const CreatedWorkspacesInfo = ({createNumber,className}:Props) => {
  const t=useTranslations("COMMON");
  
    return (
    <p className={cn("text-muted-foreground sm:text-sm text-xs tect-center",className)}>
        {
            t("ACTIVE_WORKSPACES.FIRST")
        } {" "}

        <span className='font-bold'>
            {createNumber} {
                t("ACTIVE_WORKSPACES.SECOND")
            } {
                MAX_USER_WORKSPACES

            }

        </span> {" "}
        {
            t("ACTIVE_WORKSPACES.THIRD")
        }

    </p>
  )
}

export default CreatedWorkspacesInfo
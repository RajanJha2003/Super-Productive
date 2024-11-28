"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { Workspace } from '@prisma/client';
import { ScrollAreaCorner } from '@radix-ui/react-scroll-area';
import { usePathname } from 'next/navigation';
import React from 'react'
import Settings from './settingsOptions/Settings';
import CreatedWorkspacesInfo from '@/components/common/CreatedWorkspacesInfo';
import WorkspaceOptions from './workspaceOptions/WorkspaceOptions';


interface Props{
    createdWorkspaces:number;
    userAdminWorkspaces:Workspace[];
    userWorkspaces:Workspace[];
}

const OptionsSidebar = ({createdWorkspaces,userAdminWorkspaces,userWorkspaces}:Props) => {
  const pathname=usePathname();
  if(pathname==="/en/dashboard") return null;

  const urlWorkspaceId:string|undefined=pathname.split("/")[3];
  const urlAdditionalId:string|undefined=pathname.split("/")[6];
  const chatId:string|undefined=pathname.split("/")[5];

  const workspaceId=urlWorkspaceId ? urlWorkspaceId:"";

  if(pathname==="/dashboard" ||
     pathname==="/dashboard/started" ||
      pathname==="/dasboard/calendar" ||
      (
        urlAdditionalId &&
        pathname===`/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}/edit`
      ) || 
      (
        urlAdditionalId &&
        pathname===`/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}/edit`
      )
       
    ){

        return null;


  }
  
    return (
    <div className='border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between'>

    <ScrollArea className='h-full'>
      {
        pathname.includes("/dashboard/settings") && (
          <Settings userAdminWorkspaces={userAdminWorkspaces} />

        )
      }

{(pathname === `/dashboard/workspace/${workspaceId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/chat/${chatId}`) && (
          <WorkspaceOptions workspaceId={workspaceId} />
        )}
      
    </ScrollArea>

    <CreatedWorkspacesInfo createNumber={createdWorkspaces} />
    </div>
  )
}

export default OptionsSidebar
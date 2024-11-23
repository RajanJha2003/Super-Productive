import { ScrollArea } from '@/components/ui/scroll-area';
import { Workspace } from '@prisma/client';
import React from 'react'
import Top from './Top';
import Workspaces from './workspaces/Workspaces';
import AddWorkspace from './newWorkspace/AddWorkspace';

interface Props{
    userWorkspaces:Workspace[];
    createdWorkspaces:number;
}

const ShortcutSidebar = ({userWorkspaces,createdWorkspaces}:Props) => {
  return (
    <div className='border-r h-full flex flex-col justify-between items-center p-4 sm:py-6'>
        <ScrollArea className='max-h-[35rem]'>
            <div className='w-full space-y-3 p-1'>
                <Top />
                <Workspaces userWorkspaces={userWorkspaces} href="/dashboard/workspace"/>
                <AddWorkspace createdWorkspaces={createdWorkspaces} />

            </div>

        </ScrollArea>

    </div>
  )
}

export default ShortcutSidebar
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended'
import { Layers, Users2 } from 'lucide-react';
import React from 'react'
import EditWorkspaceCard from './overview/Edit/EditWorkspaceCard';


interface Props{
  workspace:SettingsWorkspace;
  workspaceId:string;
}

const WorkspaceTab = ({workspace,workspaceId}:Props) => {
  return (
    <Tabs defaultValue='overview'>
      <TabsList className='mb-6'>
        <TabsTrigger value='overview' className='mr-2 flex items-center gap-2'>
          <Layers size={18} />
          Overview

        </TabsTrigger>
        <TabsTrigger value='members' className='mr-2 flex items-center gap-2'>
          <Users2 size={18} />
          Members

        </TabsTrigger>

        
      </TabsList>
      <TabsContent tabIndex={1} value='overview'>
        <EditWorkspaceCard workspace={workspace} />

        <div className='py-4 sm:py-6'>
          <Separator />
        </div>

      </TabsContent>

    </Tabs>
  )
}

export default WorkspaceTab
import DashboardHeader from '@/components/header/DashboardHeader'
import { FilterByUsersAndTagsInWorkspaceProvider } from '@/context/FilterByUsersAndTagsInWorkspace'
import { gertWorkspaceWithChatId, getUserWorkspaceRole } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { notFound } from 'next/navigation';
import React from 'react'


interface Params{
  params:{
    workspace_id:string;
  }
}

const page = async({params:{workspace_id}}:Params) => {

  const session=await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}`);

  const [workspace,userRole]=await Promise.all([
    gertWorkspaceWithChatId(workspace_id,session.user.id),
    getUserWorkspaceRole(workspace_id,session.user.id)
  ])
   

  if(!workspace || !userRole) notFound();

  
  return (
   <FilterByUsersAndTagsInWorkspaceProvider>
    <DashboardHeader addManualRoutes={[
      {
        name:"DASHBOARD",
        href:"/dashboard",
        useTranslate:true
      },
      {
        name:"DASHBOARD",
        href:"/dashboard",
        useTranslate:true
      }
    ]} />
    {
      
    }
   </FilterByUsersAndTagsInWorkspaceProvider>
  )
}

export default page
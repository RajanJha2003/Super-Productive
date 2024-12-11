import AddTaskShortcut from '@/components/addTaskShortCut/AddTaskShortcut';
import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers';
import FilterContainer from '@/components/workspaceMainPage/filter/FilterContainer';
import LeaveWorkspace from '@/components/workspaceMainPage/shortcuts/leaveWorkspace/LeaveWorkspace';
import ShortcutContainer from '@/components/workspaceMainPage/shortcuts/ShortcutContainer';
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
  //  <FilterByUsersAndTagsInWorkspaceProvider>
  <>
   <DashboardHeader addManualRoutes={[
      {
        name:"DASHBOARD",
        href:"/dashboard",
        useTranslate:true
      },
      {
        name:workspace.name,
        href:`/dashboard/workspace/${workspace_id}`,
        
      }
    ]}> {
      userRole==="ADMIN" || userRole==="OWNER" && (
        <InviteUsers workspace={workspace} />
      )
      
    }
    {
      userRole!=="OWNER" && <LeaveWorkspace workspace={workspace} />
    }
    <AddTaskShortcut userId={session.user.id} />
    </DashboardHeader>
    <main className='flex flex-col gap-2 w-full'>
      <ShortcutContainer workspace={workspace} userRole={userRole} />
      <FilterContainer sessionUserId={session.user.id} />

    </main>
  </>
   
   
  //  </FilterByUsersAndTagsInWorkspaceProvider>
  )
}

export default page
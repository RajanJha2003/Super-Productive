import AddTaskShortcut from '@/components/addTaskShortCut/AddTaskShortcut';
import DashboardHeader from '@/components/header/DashboardHeader';
import InviteUsers from '@/components/inviteUsers/InviteUsers';
import WorkspaceTab from '@/components/settings/workspace/WorkspaceTab';
import { getWorkspaceSettings } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { notFound } from 'next/navigation';
import React from 'react'


interface Params{
    params:{
        workspace_id:string;
    }
}

const page = async({params:{workspace_id}}:Params) => {

    const session=await checkIfUserCompletedOnboarding(`/dashboard/settings/workspace/${workspace_id}`);
    const workspace=await getWorkspaceSettings(workspace_id,session?.user.id);

    if(!workspace) return notFound();

    const user=workspace.subscribers.find((subscriber)=>subscriber.user.id===session?.user.id);
  return (
    <>
    <DashboardHeader
        className="mb-2 sm:mb-0"
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: "settings",
            href: "/dashboard/settings",
          },
          {
            name: workspace.name,
            href: "/",
          },
        ]}
      >
        {
            (user?.userRole==="ADMIN"||user?.userRole==="OWNER")&&(
            
            <InviteUsers workspace={workspace} />
            )
        }
        <AddTaskShortcut userId={session?.user.id} />
      </DashboardHeader>

      <main className='flex flex-col gap-2'>
        <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
      </main>
    </>
  )
}

export default page
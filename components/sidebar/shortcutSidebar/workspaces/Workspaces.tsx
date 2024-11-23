import { Workspace } from '@prisma/client';
import React from 'react'
import WorkspaceComponent from './WorkspaceComponent';

interface Props{
    userWorkspaces:Workspace[];
    href:string;
}

const Workspaces = ({userWorkspaces,href}:Props) => {
  return (

    <div className='flex flex-col gap-3'>
        {
            userWorkspaces.map((workspace,i)=>(
                <WorkspaceComponent
                key={workspace.id}
                workspace={workspace}
                href={href}
                />
            ))
        }

    </div>
  )
}

export default Workspaces
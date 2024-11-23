
"use client";

import { Workspace } from '@prisma/client';
import React from 'react'


interface Props{
  userWorkspaces:Workspace[];
  userId:string;
  userAdminWorkspaces:Workspace[];
}

const SidebarContainer = ({userWorkspaces,userId,userAdminWorkspaces}:Props) => {


  const createdWorkspaces=userWorkspaces.filter(workspace=>workspace.creatorId===userId);
  return (
    <div>SidebarContainer</div>
  )
}

export default SidebarContainer
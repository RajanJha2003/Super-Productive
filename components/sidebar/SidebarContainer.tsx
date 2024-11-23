
"use client";

import { useToggleSidebar } from '@/context/ToggleSidebar';
import { Workspace } from '@prisma/client';
import React from 'react'
import ShortcutSidebar from './shortcutSidebar/ShortcutSidebar';


interface Props{
  userWorkspaces:Workspace[];
  userId:string;
  userAdminWorkspaces:Workspace[];
}

const SidebarContainer = ({userWorkspaces,userId,userAdminWorkspaces}:Props) => {
  const {isOpen,setIsOpen}=useToggleSidebar();


  const createdWorkspaces=userWorkspaces.filter(workspace=>workspace.creatorId===userId);
  return (
    <>
    <aside className={`fixed z-50 top-0 h-full left-0 lg:static bg-background border-r flex lg:translate-x-0 transition-all duration-300 ${isOpen ? "translate-x-0 shadow-sm":"translate-x-[-100%]"}`} >
           <ShortcutSidebar userWorkspaces={userWorkspaces ? userWorkspaces:[]} createdWorkspaces={createdWorkspaces.length} />
    </aside>

    </>
  )
}

export default SidebarContainer
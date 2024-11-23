import { getUserAdminWorkspaces, getWorkspaces } from '@/lib/api';
import { getAuthSession } from '@/lib/auth'
import React from 'react'
import SidebarContainer from './SidebarContainer';

const Sidebar = async() => {

  const session=await getAuthSession();
  if(!session) return null;

  const [userWorkspaces,userAdminWorskspaces]=await Promise.all([
    getWorkspaces(session.user.id),
    getUserAdminWorkspaces(session.user.id)


  ])



  return (
    <SidebarContainer userWorkspaces={userWorkspaces ? userWorkspaces : []} userAdminWorkspaces={userAdminWorskspaces ? userAdminWorskspaces : []} userId={session.user.id} />
  )
}

export default Sidebar
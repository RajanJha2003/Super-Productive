import DashboardHeader from '@/components/header/DashboardHeader'
import { FilterByUsersAndTagsInWorkspaceProvider } from '@/context/FilterByUsersAndTagsInWorkspace'
import React from 'react'

const page = () => {


  
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
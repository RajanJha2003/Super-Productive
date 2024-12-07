import DashboardHeader from '@/components/header/DashboardHeader'
import { FilterByUsersAndTagsInWorkspaceProvider } from '@/context/FilterByUsersAndTagsInWorkspace'
import React from 'react'

const page = () => {
  return (
   <FilterByUsersAndTagsInWorkspaceProvider>
    <DashboardHeader />
   </FilterByUsersAndTagsInWorkspaceProvider>
  )
}

export default page
import AddTaskShortcut from '@/components/addTaskShortCut/AddTaskShortcut';
import DashboardHeader from '@/components/header/DashboardHeader';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'

const page = async() => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");
  return (
    <>
    <DashboardHeader>
      <AddTaskShortcut userId={session.user.id} />
    </DashboardHeader>


    </>
  )
}

export default page
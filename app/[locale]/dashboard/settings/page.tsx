import AddTaskShortcut from '@/components/addTaskShortCut/AddTaskShortcut';
import DashboardHeader from '@/components/header/DashboardHeader';
import AccountInfo from '@/components/settings/AccountInfo';
import DeleteAccount from '@/components/settings/DeleteAccount';
import Heading from '@/components/settings/Heading';
import { Separator } from '@/components/ui/separator';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'

const page = async() => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");
  return (
    <>
    <DashboardHeader>
      <AddTaskShortcut userId={session.user.id} />
    </DashboardHeader>
    <main>
      <Heading />
      <AccountInfo session={session} />
      <div className='p-4 sm:p-6'>
        <Separator />
      </div>
      <DeleteAccount userEmail={session.user.email!} />

    </main>


    </>
  )
}

export default page
import Welcoming from '@/components/common/Welcoming';
import DashboardHeader from '@/components/header/DashboardHeader';
import { getInitialHomeRecentActivity } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'

const page = async() => {

  const session = await checkIfUserCompletedOnboarding("/dashboard");

  const initialRecentActivity = await getInitialHomeRecentActivity(
    session.user.id
  );
  return (
    <>
    <DashboardHeader />
    <Welcoming hideOnDesktop
     className='px-4 py-2'
      username={session.user.username!} name={session.user.name} surname={session.user.surname}  />
    
    </>
  )
}

export default page
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
    
    </>
  )
}

export default page
import { getInitialHomeRecentActivity } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'

const page = async() => {

  const session = await checkIfUserCompletedOnboarding("/dashboard");

  const initialRecentActivity = await getInitialHomeRecentActivity(
    session.user.id
  );
  return (
    <div>page</div>
  )
}

export default page
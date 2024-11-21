import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'

const page = async() => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");
  return (
    <div>page</div>
  )
}

export default page
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'


interface Params{
    params:{
        workspace_id:string;
    }
}

const page = async({params:{workspace_id}}:Params) => {

    const session=await checkIfUserCompletedOnboarding(`/dtingsashboard/settings/workspace/${workspace_id}`);
  return (
    <div>page</div>
  )
}

export default page
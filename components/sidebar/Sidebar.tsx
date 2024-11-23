import { getAuthSession } from '@/lib/auth'
import React from 'react'

const Sidebar = async() => {

  const session=await getAuthSession();
  if(!session) return null;

  

  return (
    <div>Sidebar</div>
  )
}

export default Sidebar
import { LucideIcon } from 'lucide-react';
import React from 'react'


interface Props{
    href:string;
    icon:LucideIcon;
    hoverTextKey:string;
    include?:string;
}
const SidebarLink = ({href,icon,hoverTextKey,include}:Props) => {
  return (
    <div>SidebarLink</div>
  )
}

export default SidebarLink
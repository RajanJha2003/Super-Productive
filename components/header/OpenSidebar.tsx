
"use client"

import React from 'react'
import { Button } from '../ui/button';
import { useToggleSidebar } from '@/context/ToggleSidebar';
import { PanelLeftOpen } from 'lucide-react';

const OpenSidebar = () => {
    const {setIsOpen}=useToggleSidebar();
  return (
    <Button
      onClick={() => {
        setIsOpen(true);
      }}
      className="text-muted-foreground lg:hidden"
      variant={"ghost"}
      size={"icon"}
    >
      <PanelLeftOpen />
    </Button>
  )
}

export default OpenSidebar
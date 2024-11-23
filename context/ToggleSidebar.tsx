"use client";

import React, { createContext, useContext, useState } from "react"

interface Props{
    children:React.ReactNode;
}


interface ToggleSidebarContext{
    isOpen:boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
}



export const ToggleSidebarCtx=createContext<ToggleSidebarContext|null>(null);

export const ToggleSidebarProvider=({children}:Props)=>{
      const [isOpen,setIsOpen]=useState(false);

      return <ToggleSidebarCtx.Provider value={{isOpen,setIsOpen}}>
        {children}
      </ToggleSidebarCtx.Provider>
}



export const useToggleSidebar=()=>{
    const context=useContext(ToggleSidebarCtx);
    if(!context) throw new Error("useToggleSidebar must be used within a ToggleSidebarProvider");
    return context;
}

"use client";

import { useTranslations } from 'next-intl';
import React, { useState } from 'react'


interface Props{
  userId:string;
}

const AddTaskShortcut = ({userId}:Props) => {

  const [open,setOpen]=useState(false);
  const m=useTranslations("MESSAGES");
  const t=useTranslations("TASK_SHORTCUT");
  
  return (
    <div>AddTaskShortcut</div>
  )
}

export default AddTaskShortcut
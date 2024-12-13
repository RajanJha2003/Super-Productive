"use client";

import { ReadOnlyEmoji } from '@/components/common/ReadOnlyEmoji';
import { Card, CardContent } from '@/components/ui/card';
import { ExtendedTask } from '@/types/extended'
import { UserPermission } from '@prisma/client';
import { Star } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import React, { useState } from 'react'
import TaskOptions from './TaskOptions';
import AssignedToTaskSelector from '../assignToTask/AssignedToTaskSelector';



interface Props{
  task:ExtendedTask;
  isSavedByUser:boolean;
  userRole:UserPermission|null;

}

const ReadOnlyContent = ({task,isSavedByUser,userRole}:Props) => {

  const [isSaved,setIsSaved]=useState(isSavedByUser);
  const t=useTranslations("TASK.EDITOR.READ_ONLY");
  const [updater]=useState(task.updatedAt);

  const format=useFormatter();
  const dateTime=new Date(task.updatedAt);
  const now=new Date();

  const onSetIsSaved = () => {
    setIsSaved((prev) => !prev);
  };



  return (
    <Card>
      <CardContent className='py-4 sm:py-6 flex flex-col gap-10 relative'>
        <div className='w-full flex flex-col sm:flex-row items-start sm:gap-4 gap-2'>
           <ReadOnlyEmoji selectedEmoji={task.emoji} />
           <div className='w-full flex flex-col gap-2'>
            <div className='w-full flex justify-between items-center'>
              <div className="w-5/6">
                 <p className='text-2xl font-semibold flex items-center gap-2'>
                  {task.title ? task.title : t("NO_TITLE")}
                  {isSaved && <Star />
                  
    
                  }

                 </p>
              </div>
              <div className='absolute top-5 right-5 sm:static'>
              <TaskOptions
                  onSetIsSaved={onSetIsSaved}
                  isSaved={isSaved}
                  taskId={task.id}
                  workspaceId={task.workspaceId}
                  userRole={userRole}
                />

              </div>

            </div>
            <div className='w-full gap-1 flex flex-wrap flex-row'>
              <AssignedToTaskSelector taskId={task.id} workspaceId={task.workspaceId} />

            </div>

           </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReadOnlyContent
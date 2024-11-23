"use client";

import CreatedWorkspacesInfo from '@/components/common/CreatedWorkspacesInfo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Warning from '@/components/ui/warning';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

interface Props{
    createdWorkspaces:number;
}

const AddWorkspace = ({createdWorkspaces}:Props) => {

    const [open,setOpen]=useState(false);

    const t=useTranslations("SIDEBAR");
  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <HoverCard openDelay={250} closeDelay={250}>
                <DialogTrigger asChild>
                    <HoverCardTrigger>
                        <Button onClick={()=>setOpen(true)} variant={"ghost"} size={"icon"}>
                            <Plus />


                        </Button>
                    </HoverCardTrigger>

                </DialogTrigger>
                <HoverCardContent align='start'>
                    {
                        t("MAIN.NEW_WORKSPACE_HOVER")
                    }

                </HoverCardContent>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t("MAIN.NEW_WORKSPACE_DIALOG_TITLE")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("MAIN.NEW_WORKSPACE_DIALOG_DESC")}
                        </DialogDescription>
                    </DialogHeader>
                    <Warning className='hidden sm:flex' blue>
                        <CreatedWorkspacesInfo className='text-left text-secondary-foreground' createNumber={createdWorkspaces} />

                    </Warning>
                </DialogContent>

            </HoverCard>


        </Dialog>

    </div>
  )
}

export default AddWorkspace
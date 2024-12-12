import { ClientError } from '@/components/error/ClientError';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LoadingState } from '@/components/ui/loadingState';
import { useFilterByUsersAndTagsInWorkspace } from '@/context/FilterByUsersAndTagsInWorkspace';
import { FilterIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'


interface Props{
    sessionUserId:string;
}

const Filter = ({sessionUserId}:Props) => {
    const {isError,isLoading}=useFilterByUsersAndTagsInWorkspace();
    const t=useTranslations("WORKSPACE_MAIN_PAGE.FILTER");
  return (
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button size={"sm"} className=' flex gap-2 items-center rounded-lg '>
            <FilterIcon size={16} />


        </Button>

    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-fit' align='start'>
        {
            isLoading?(
                <div className='h-16 flex items-center justify-center'>
                    <LoadingState />

                </div>
            ):isError?(
                <ClientError message='Error getting tags' className='bg-popover mt-0 sm:mt-0 md:mt-0' />
            ):(
                <CommandContainer sessionUserId={sessionUserId} />
            )
        }

    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default Filter
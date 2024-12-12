import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { useFilterByUsersAndTagsInWorkspace } from '@/context/FilterByUsersAndTagsInWorkspace';
import { useTranslations } from 'next-intl';
import React from 'react'
import {CommandUserItem} from './CommandUserItem';


interface Props{
    sessionUserId:string;
}

const CommandContainer = ({sessionUserId}:Props) => {
    const {allTags,allUsers,filterAssignedUsers,filterTags}=useFilterByUsersAndTagsInWorkspace();
    const t=useTranslations("WORKSPACE_MAIN_PAGE.COMMAND");
  return (
    <Command className='w-[15rem]'>
        <CommandInput placeholder={t("SEARCH")} />
        <CommandList>
            <CommandEmpty>{t("NO_RESULTS_FOUND")}</CommandEmpty>
            <CommandGroup heading={t("ASSIGNED_TO")}>
                {
                    allUsers.map((user)=>{
                        const isActive=filterAssignedUsers.some(
                            (activeUser)=>activeUser.id===user.id
                        );
                        return(
                            <CommandUserItem key={user.id} sessionUserId={sessionUserId}
                            username={user.username} image={user.image} id={user.id} active={isActive}
                            />
                        )
                    })
                }

            </CommandGroup>
        </CommandList>
    </Command>
  )
}

export default CommandContainer
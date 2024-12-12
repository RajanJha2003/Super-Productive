"use client";

import { useFilterByUsersAndTagsInWorkspace } from '@/context/FilterByUsersAndTagsInWorkspace';
import React from 'react'
import Filter from './Filter';


interface Props{
  sessionUserId:string;
}

const FilterContainer = ({sessionUserId}:Props) => {
    const {filterAssignedUsers,filterTags}=useFilterByUsersAndTagsInWorkspace();
  return (
    <div className='flex w-full flex-wrap pb-4 gap-2'>
    <Filter sessionUserId={sessionUserId} />

    </div>
  )
}

export default FilterContainer
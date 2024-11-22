"use client";

import { useIsVisible } from '@/hooks/useIsVisible';
import { HomePageImage } from '@/types/extended';
import React from 'react'
import ImageCarousel from '../carousel/ImageCarousel';


interface Props{
  reverse?:boolean;
  title:string;
  desc:string;
  images:HomePageImage[];
  id?:string
}
const Section = ({reverse,title,desc,images,id}:Props) => {
  const {isVisible,ref}=useIsVisible();
  return (
  <section id={id} ref={ref} className={`mt-24 md:mt-52 lg:mt-80 flex flex-col justify-between items-center gap-6 md:gap-10 ${reverse ? "lg:flex-row":"lg:flex-row-reverse"}`}>
    <div className='w-full lg:w-2/5 flex flex-col gap-1 sm:gap-4'>
    <h2 className='font-semibold lg:text-4xl text-2xl sm:text-3xl'>{title}</h2>
    <p className='lg:text-2xl text-base mt-8 sm:mt-4 sm:text-lg md:text-xl text-muted-foreground'>
      {desc}
    </p>

    </div>
    <div className='w-full lg:w-3/5 relative isolate group'>
    <ImageCarousel images={images} />

    </div>

  </section>
  )
}

export default Section
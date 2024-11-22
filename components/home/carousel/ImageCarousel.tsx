"use client";
import Autoplay from 'embla-carousel-autoplay'

import { HomePageImage } from '@/types/extended';
import React, { useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { platform } from 'os';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

interface Props{
  className?:string;
  images:HomePageImage[];
}

const ImageCarousel = ({className,images}:Props) => {
  const plugin=useRef(Autoplay({
    delay:2000,
    stopOnInteraction:true
  }))
  return (
    <Carousel className={cn("w-full h-full")} plugins={[plugin.current]} onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
      <CarouselContent className='h-full w-full'>
        {
          images.map((img,index)=>(
            <CarouselItem key={index}>
              <div className='w-full overflow-hidden rounded-3xl border border-border h-fit'>
                <AspectRatio ratio={16/9}>
                <Image className='w-full h-full object-cover' src={img.src} alt={img.alt} width={1900} height={1900} />

                </AspectRatio>

              </div>


            </CarouselItem>
          ))
        }

      </CarouselContent>
    </Carousel>
  )
}

export default ImageCarousel
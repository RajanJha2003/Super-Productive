import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/ui/user-avatar';
import { cn } from '@/lib/utils';
import { imageSchema, ImageSchema } from '@/schema/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface Props{
    profileImage?:string | null;
    className?:string
}

const AddUserImage = ({profileImage,className}:Props) => {

    const [imagePreview,setImagePreview]=useState("");
  const form=useForm<ImageSchema>({
    resolver:zodResolver(imageSchema)
  })
    const t=useTranslations("CHANGE_PROFILE_IMAGE")
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2'>
        <p className='text-sm text-muted-foreground'>Add a photo</p>
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn("group relative bg-muted w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden",className)}>
                  {
                    profileImage ? (
                        <Image priority src={profileImage} alt='' fill className='object-cover w-full h-full' />
                    ):(
                        <User />
                    )
                  }

                  <div className='group-hover:opacity-80 transition-opacity duration-200 opacity-0 w-full h-full absolute bg-black flex justify-center items-center flex-col gap-1 text-xs text-white '>
                    <Camera size={20} />
                    <p>{t("TITLE")}</p>
                  </div>
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col items-center justify-center sm:max-w-[28rem] p-6'>
                <DialogHeader className='items-center justify-center'>
                    <DialogTitle>Upload  a photo</DialogTitle>

                </DialogHeader>
                {imagePreview ? (
            <div className="rounded-full w-32 h-32 sm:w-52 sm:h-52 relative overflow-hidden my-5">
              <Image
                src={imagePreview}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <UserAvatar
              className="w-32 h-32 sm:w-52 sm:h-52 my-5"
              size={52}
              profileImage={profileImage}
            />
          )}

          <Form {...form}>
            <form>
                <FormField control={form.control} name='image' render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <div className='flex justify-center items-center'>
                                <Button type='button' className=' mb-1'>
                                  Choose a file
                                </Button>
                                <Input {...field} value={undefined} type='file' id='image' className='hidden' accept='image/*' />

                            </div>
                        </FormControl>
                    </FormItem>
                )}>

                </FormField>

                

            </form>
          </Form>

                
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddUserImage
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
import { useRouter } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

interface Props{
    profileImage?:string | null;
    className?:string
}

const AddUserImage = ({profileImage,className}:Props) => {
  const[open,setOpen]=useState(false);
  const inputRef=useRef<HTMLInputElement>(null);
  const router=useRouter();

    const [imagePreview,setImagePreview]=useState("");
  const form=useForm<ImageSchema>({
    resolver:zodResolver(imageSchema)
  })
    const t=useTranslations("CHANGE_PROFILE_IMAGE")

    const onImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target.files[0]){
        const selectedFile=e.target.files[0];
        const result=imageSchema.safeParse({image:selectedFile});
        if(result.success){
          form.clearErrors("image");
          form.setValue("image",selectedFile);
          setImagePreview(URL.createObjectURL(e.target.files[0]))
        }else{
          const error=result.error.flatten().fieldErrors.image;
          error?.forEach((error)=>form.setError("image",{message:error}))
        }
      }

    }


    const imageOptions=useMemo(()=>{
      if(!imagePreview && profileImage){
        return{
          canDelete:true,
          canSave:false
        }
      }else if(imagePreview && profileImage){
        return{
          canDelete:false,
          canSave:true
        }

      }else if(imagePreview && !profileImage){
        return{
          canDelete:false,
          canSave:true
        }
      }else{
        return{
          canDelete:false,
          canSave:false
        }
      }
    },[imagePreview,profileImage])


    const onSubmit=async(data:ImageSchema)=>{


    }
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2'>
        <p className='text-sm text-muted-foreground'>Add a photo</p>
        <Dialog open={open} onOpenChange={setOpen}>
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='image' render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <div className='flex justify-center items-center'>
                                <Button onClick={()=>inputRef.current?.click()} type='button' className=' mb-1'>
                                  Choose a file
                                </Button>
                                <Input  {...field} value={undefined} type='file' id='image' className='hidden' onChange={onImageChange}  accept='image/*' />

                            </div>
                        </FormControl>
                    </FormItem>
                )}>

                </FormField>
                <div className='flex mt-5 w-full justify-center items-center gap-4'>
                  

                </div>

                

            </form>
          </Form>

                
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddUserImage
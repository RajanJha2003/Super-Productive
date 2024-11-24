"use client";

import { UploadFile } from '@/components/onboarding/common/UploadFile';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/ui/loadingState';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { ApiWorkspaceSchema, WorkspaceSchema, workspaceSchema } from '@/schema/workSpaceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props{
    onSetOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWorkspaceForm = ({onSetOpen}:Props) => {

    const t = useTranslations("AUTH.NEW_WORKSPACE");
    const m = useTranslations("MESSAGES");
    const { toast } = useToast();
    const form = useForm<WorkspaceSchema>({
      resolver: zodResolver(workspaceSchema),
      defaultValues: {
        workspaceName: "",
      },
    });
    const [uploadError, setUploadError] = useState(false);


    const {mutate:newWorkspace, isPending} = useMutation({
      mutationFn:async(data:ApiWorkspaceSchema)=>{
        const {data:result}=await axios.post("/api/workspace/new",data);
        return result;

      },
      onError:(err:AxiosError)=>{
        const error=err.response?.data?err.response.data:"ERRORS.DEFAULT";
        toast({
          title:m(error),
          variant:"destructive"
        })
      },
      onSuccess:()=>{
        onSetOpen(false);
        toast({
          title:m("SUCCESS.NEW_WORKSPACE")
        })
      },
      mutationKey:["newWorkspace"]
    })



    const { startUpload, isUploading } = useUploadThing("imageUploader", {
      onUploadError: (error) => {
        setUploadError(true);
        toast({
          title: m("ERRORS.WORKSPACE_ICON_ADDED"),
          variant: "destructive",
        });
      },
      onClientUploadComplete: (data) => {
        if (!data) {
         
          setUploadError(true);
          toast({
            title: m("ERRORS.WORKSPACE_ICON_ADDED"),
            variant: "destructive",
          });
        }
      }
    });



    const onSubmit = async(data:WorkspaceSchema) => {
      setUploadError(false);
      const image:File|undefined|null=data.file;
      let workspaceImageUrl:null|string=null;
      if(image){
        const data=await startUpload([image]);
        if(data){
          workspaceImageUrl=data[0].url;
        }
      }

      if(uploadError) return;

      newWorkspace({
        workspaceName:data.workspaceName,
        file:workspaceImageUrl

      })
    }
  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className='max-w-md w-full space-y-8'>
        <div className='space-y-1.5'>
          <FormField name='workspaceName' control={form.control} render={({field})=>(
            <FormItem>
              <FormLabel className='text-muted-foreground'>
                {
                  t("INPUTS.NAME")
                }

              </FormLabel>
              <FormControl>
                <Input className='bg-muted' {...field} placeholder={t("PLACEHOLDERS.NAME")}  />
              </FormControl>
            </FormItem>
          )} />

        </div>
        <UploadFile
         form={form}
          schema={workspaceSchema}
           inputAccept='image/*'
            typesDescription={t("IMAGE")}
            ContainerClassName='w-full'
            LabelClassName='text-muted-foreground mb-1.5 self-start'
            LabelText={t("INPUTS.FILE")}
            
            />
            <Button disabled={!form.formState.isValid || isUploading || isPending} type='submit' className='w-full mt-10 max-w-md font-semibold'>

              {
                isUploading || isPending ? (
                  <LoadingState loadingText={t("BTN_PENDING")} />
                ) : (
                  t("BTN_ADD")
                )
              }
            </Button>
      </form>
    </Form>
  )
}

export default AddWorkspaceForm
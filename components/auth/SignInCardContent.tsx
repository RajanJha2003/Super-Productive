"use client";

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { signInSchema,SignInSchema } from '@/schema/signInSchema';

import { CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import ProviderSignInBtn from './ProviderSignInBtn';
import ProviderSignInBtns from './ProviderSignInBtns';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoadingState } from '../ui/loadingState';

const SignInCardContent = () => {

  const [isLoading, setIsLoading] = useState(false);

    const t=useTranslations("AUTH");
    const m=useTranslations("MESSAGES");

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });
  return (
    <CardContent>
        <Form {...form}>
            <form className='space-y-7' > 
              <ProviderSignInBtns signInCard onLoading={setIsLoading} />
               <div className='space-y-1.5'>
                <FormField control={form.control} name='email' render={({field})=>(
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("EMAIL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name='password' render={({field})=>(
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder={t("PASSWORD")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

               </div>
               <div className='space-y-2'>
                <Button disabled={isLoading} type='submit' className='w-full font-bold text=white'>
                     {
                      isLoading ?(
                      <LoadingState loadingText={m("PENDING.LOADING")} />
                      ):(
                        t("SIGN_IN.SUBMIT_BTN")
                      )
                     }
                   
                </Button>

               </div>
            </form>

        </Form>
    </CardContent>
  )
}

export default SignInCardContent
'use client';

import React, { useState } from 'react'
import { CardContent } from '../ui/card'
import { useForm } from 'react-hook-form';
import { signInSchema, SignInSchema } from '@/schema/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import ProviderSignInBtns from './ProviderSignInBtns';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoadingState } from '../ui/loadingState';
import { useTranslations } from 'next-intl';
import { signUpSchema, SignUpSchema } from '@/schema/signUpSchema';

const SignUpCardContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t=useTranslations("AUTH");
  const m=useTranslations("MESSAGES");
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username:""
    },
  });
  return (
    <CardContent>
        <Form {...form}>
            <form className='space-y-7' > 
              <ProviderSignInBtns disabled={isLoading}  onLoading={setIsLoading} />
               <div className='space-y-1.5'>
                <FormField control={form.control} name='email' render={({field})=>(
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("EMAIL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("USERNAME")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <span className="font-bold">{t("SIGN_UP.TERMS.SECOND")}</span>
            </p>

               </div>
            </form>

        </Form>
    </CardContent>
  )
}

export default SignUpCardContent
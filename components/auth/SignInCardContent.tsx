"use client";

import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { signInSchema,SignInSchema } from '@/schema/signInSchema';

import { CardContent } from '../ui/card';
import { Form } from '../ui/form';

const SignInCardContent = () => {

    const t=useTranslations("AUTH");

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
            <form >

            </form>

        </Form>
    </CardContent>
  )
}

export default SignInCardContent
import { useTranslations } from 'next-intl'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import SignInCardContent from './SignInCardContent';
import SignUpCardContent from './SignUpCardContent';

interface Props{
    signInCard?:boolean
}

const AuthCard = ({signInCard}:Props) => {
    const t=useTranslations("AUTH");

  return (
    <>
    <Card className='w-full sm:min-w-28rem] sm:w-auto'>
        <CardHeader>
            <Image alt='' className='rounded-full object-cover self-center' width={50} height={50} src={"https://github.com/shadcn.png"} />
            <CardTitle className='pt-2'>
                {
                    signInCard ? t("SIGN_IN.TITLE"):t("SIGNUP_TITLE")
                }

            </CardTitle>
            <CardDescription>
                {
                    signInCard ? t("SIGN_IN.DESC"):t("SIGN_UP.DESC")
                }
            </CardDescription>
        </CardHeader>
        {
            signInCard ? <SignInCardContent />:<SignUpCardContent />
        }
        
    </Card>
    </>
  )
}

export default AuthCard
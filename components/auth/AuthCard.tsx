import { useTranslations } from 'next-intl'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import SignInCardContent from './SignInCardContent';
import SignUpCardContent from './SignUpCardContent';
import Link from 'next/link';

interface Props{
    signInCard?:boolean
}

const AuthCard = ({signInCard}:Props) => {
    const t=useTranslations("AUTH");

  return (
    <>
    <Card className='w-full sm:min-w-[28rem] sm:w-auto'>
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
    <p className="text-sm">
        {signInCard
          ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")
          : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
        <Link
          className="text-primary"
          href={signInCard ? "/sign-up" : "/sign-in"}
        >
          {signInCard
            ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")
            : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}{" "}
        </Link>
      </p>
    </>
  )
}

export default AuthCard
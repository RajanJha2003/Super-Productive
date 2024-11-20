import AuthCard from '@/components/auth/AuthCard';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in",
  };

const SignIn = () => {
    return <AuthCard signInCard />;
}

export default SignIn
import AuthCard from '@/components/auth/AuthCard';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Sign up",
    description: "Sign up",
  };

const SignIn = () => {
    return <AuthCard  />;
}

export default SignIn
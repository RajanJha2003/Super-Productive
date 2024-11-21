"use client";

import React from 'react'
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    providerName: "google" | "github";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ProviderSignInBtn = ({children,providerName,onLoading,...props}:Props) => {
  return (
    <Button {...props} variant={"secondary"} type='button'  >
        {children}

    </Button>
  )
}

export default ProviderSignInBtn
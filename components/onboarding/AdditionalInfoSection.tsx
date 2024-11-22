"use client";

import { useOnboardingForm } from '@/context/OnBoardingForm';
import React from 'react'
import { AppTitle } from '../ui/app-title';

interface Props{
    profileImage?:string | null;
}

const AdditionalInfoSection = ({profileImage}:Props) => {

    const {currentStep}=useOnboardingForm();
  return (
   <section className='w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6' >

    <div className='mt-16 mb-8 w-full flex flex-col items-center'>
        <AppTitle size={50} />
    </div>

   </section>
  )
}

export default AdditionalInfoSection
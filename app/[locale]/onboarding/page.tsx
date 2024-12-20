import AdditionalInfoSection from '@/components/onboarding/AdditionalInfoSection';
import {SummarySection} from '@/components/onboarding/SummarySection';
import { OnboardingFormProvider } from '@/context/OnBoardingForm';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");
  

  return (
    <OnboardingFormProvider session={session}>
      <AdditionalInfoSection profileImage={session.user.image} />
      <SummarySection />
    </OnboardingFormProvider>
  );
};

export default page;

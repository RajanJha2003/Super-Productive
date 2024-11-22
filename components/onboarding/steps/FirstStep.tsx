import { useTranslations } from 'next-intl'
import React from 'react'
import AddUserImage from '../common/AddUserImage';



interface Props{
  profileImage?:string | null;
}
const FirstStep = ({profileImage}:Props) => {
  const t=useTranslations("ONBOARDING_FORM");

  return (
    <>
    <h2 className='font-bold text-4xl md:text-5xl flex flex-col items-center my-10'>
      <span>
        {
          t("FIRST_STEP.TITLE.FIRST")
        }
      </span>
      <span>
        {
          t("FIRST_STEP.TITLE.SECOND")
        }
      </span>
    </h2>
    <div className='max-w-md w-full space-y-8'>
      <div className='w-full flex flex-col justify-center items-center gap-2'>
        <p>{
          t("FIRST_STEP.PHOTO")
}</p>
<AddUserImage profileImage={profileImage} />


      </div>

    </div>

    </>
  )
}

export default FirstStep
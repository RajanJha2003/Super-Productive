import { useTranslations } from 'next-intl';
import React from 'react'
import { Card, CardHeader, CardDescription } from '../ui/card';

const Heading = () => {
    const t = useTranslations("SETTINGS");
  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("ACCOUNT.TITLE")}
        </h1>
        <CardDescription className="text-base">
          {t("ACCOUNT.DESC")}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default Heading
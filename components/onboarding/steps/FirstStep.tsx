"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddUserImage from "../common/AddUserImage";
import { useForm } from "react-hook-form";
import { imageSchema, ImageSchema } from "@/schema/imageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  additionalUserInfoFirstPart,
  AdditionalUserInfoFirstPart,
} from "@/schema/additionalUserInfoFirstPart";
import { useOnboardingForm } from "@/context/OnBoardingForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ActionType } from "@/types/onBoardingContext";

interface Props {
  profileImage?: string | null;
}
const FirstStep = ({ profileImage }: Props) => {
  const { name, surname, currentStep, dispatch } = useOnboardingForm();

  const form = useForm<AdditionalUserInfoFirstPart>({
    resolver: zodResolver(additionalUserInfoFirstPart),
    defaultValues: {
      name: name ? name : "",
      surname: surname ? surname : "",
    },
  });

  const onSubmit = (data: AdditionalUserInfoFirstPart) => {
    dispatch({type:ActionType.NAME,payload:data.name})
    dispatch({type:ActionType.SURNAME,payload:data.surname})
    dispatch({type:ActionType.CHANGE_SITE,payload:currentStep+1})
  };

  const t = useTranslations("ONBOARDING_FORM");

  return (
    <>
      <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center my-10">
        <span>{t("FIRST_STEP.TITLE.FIRST")}</span>
        <span>{t("FIRST_STEP.TITLE.SECOND")}</span>
      </h2>
      <div className="max-w-md w-full space-y-8">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <p>{t("FIRST_STEP.PHOTO")}</p>
          <AddUserImage profileImage={profileImage} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1.8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bg-muted">
                      {t("FIRST_STEP.INPUTS.NAME")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted" placeholder={t("FIRST_STEP.PLACEHOLDER.NAME")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="surname" render={({field})=>(
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {t("FIRST_STEP.INPUTS.SURNAME")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-muted" placeholder={t("FIRST_STEP.PLACEHOLDER.SURNAME")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <Button className="w-full max-w-md  font-semibold">
              {
                t("NEXT_BTN")
              }
              <ArrowRight width={18} height={18} />

            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default FirstStep;

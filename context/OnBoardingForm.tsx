"use client";

import { Action, ActionType, OnboardingFormContext, OnboardingFormReducer } from "@/types/onBoardingContext";
import { Session } from "next-auth";
import React, { createContext, useContext, useReducer } from "react";


export const OnboardingFormCtx = createContext<OnboardingFormContext | null>(
    null
  );


  function onBoardingFormReducer(state:OnboardingFormReducer,action:Action){
    const {type,payload}=action;

    switch(type){
      case ActionType.CHANGE_SITE:{
        return{
          ...state,
          currentStep:payload as 1|2|3,
        }

      }

      default:
        return state;

    }

  }


  interface Props{
    children:React.ReactNode,
    session:Session
  }

const initialFormState:OnboardingFormReducer={
  currentStep:1,
  name:null,
  surname:null,
  profileImage:null,
  useCase:null,
  workspaceName:"",
  workspaceImage:null

}


export const OnboardingFormProvider = ({ children, session }: Props) => {
  const [state, dispatch] = useReducer<
    React.Reducer<OnboardingFormReducer, Action>
  >(onBoardingFormReducer, {
    ...initialFormState,
    name: session.user.name,
    surname: session.user.surname,
    profileImage: session.user.image,
  });

  return (
    <OnboardingFormCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </OnboardingFormCtx.Provider>
  );
};

export const useOnboardingForm = () => {
  const ctx = useContext(OnboardingFormCtx);
  if (!ctx) throw new Error("invalid use");

  return ctx;
};
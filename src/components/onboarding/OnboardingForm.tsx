"use client"

import { useState } from "react"
import { StepOne } from "./StepOne"
import { StepTwo } from "./StepTwo"
import { ProgressBar } from "./ProgressBar"
import { StepThree } from "./StepThree"
import { StepFour } from "./StepFour"
import { StepFive } from "./StepFive"
import { StepSix } from "./StepSix"


interface OnboardingFormProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onSkip: () => void
}

export type UserData = {
  role?: string
  workTypes?: string[]
  country?: string
  tools?: string[]
  goals?: string[]
}

export function OnboardingForm({ currentStep, totalSteps, onNext, onSkip }: OnboardingFormProps) {
  const [userData, setUserData] = useState<UserData>({
    role: "",
    workTypes: [],
    country: "",
    tools: [],
    goals: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateUserData = (field: keyof UserData, value: unknown) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))


    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 2:
        if (!userData.role) {
          newErrors.role = "Please select an option"
        }
        if (!userData.workTypes?.length) {
          newErrors.workTypes = "Please select at least one option"
        }
        break
      case 3:
        break
      case 5:
        if (!userData.goals?.length) {
          newErrors.goals = "Please select at least one option"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      onNext()
    }
  }

  return (
    <div className="flex flex-col">
      <ProgressBar currentStep={currentStep === 1 ? 0 : currentStep} totalSteps={totalSteps} />

      <div className="mt-6">
        {currentStep === 1 && <StepOne onNext={onNext} />}

        {currentStep === 2 && (
          <StepTwo userData={userData} updateUserData={updateUserData} errors={errors} onNext={handleNext} />
        )}

        {currentStep === 3 && (
          <StepThree userData={userData} updateUserData={updateUserData} onNext={handleNext} onSkip={onSkip} />
        )}

        {currentStep === 4 && (
          <StepFour userData={userData} updateUserData={updateUserData} onNext={handleNext} onSkip={onSkip} />
        )}

        {currentStep === 5 && (
          <StepFive userData={userData} updateUserData={updateUserData} errors={errors} onNext={handleNext} />
        )}

        {currentStep === 6 && <StepSix/>}
      </div>
    </div>
  )
}

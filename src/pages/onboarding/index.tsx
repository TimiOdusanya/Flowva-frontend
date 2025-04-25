"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { OnboardingForm } from "@/components/onboarding/OnboardingForm"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <>
      <Head>
        <title>Flowva - Onboarding</title>
        <meta name="description" content="Set up your Flowva account" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-[#F5F6FA] w-full p-4">
        <div className="w-full max-w-[550px] rounded-xl bg-white p-8 shadow-sm">
          <OnboardingForm currentStep={currentStep} totalSteps={totalSteps} onNext={handleNext} onSkip={handleSkip} />
        </div>
      </div>
    </>
  )
}

"use client"

import type { UserData } from "./OnboardingForm"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StepThreeProps {
  userData: UserData
  updateUserData: (field: keyof UserData, value: unknown) => void
  onNext: () => void
  onSkip: () => void
}

export function StepThree({ userData, updateUserData, onNext, onSkip }: StepThreeProps) {
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Nigeria",

  ]

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-[#9013FE] leading-[1.6]">Where Are You Based?</h1>

      <p className="mt-4 text-[#2D3436]">This helps us personalize tool suggestions, currencies, and rewards for you.</p>

      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-base font-semibold mb-2">Country</h2>
          <Select value={userData.country} onValueChange={(value) => updateUserData("country", value)}>
            <SelectTrigger className="w-full h-14 border border-[#ddd] shadow-none">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-auto pt-32 flex items-center w-[100%]">
        <button onClick={onNext} 
         className="w-[80%] rounded-xl cursor-pointer bg-[#9013FE] py-3 text-white font-semibold text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
        >
          Continue
        </button>

        <Button onClick={onSkip} variant="ghost" className="text-[#2D3436] hover:text-[#9013FE]">
          Skip this step
        </Button>
      </div>
    </div>
  )
}

"use client"

import type { UserData } from "./OnboardingForm"
import { Label } from "@/components/ui/label"

interface StepFiveProps {
  userData: UserData
  updateUserData: (field: keyof UserData, value: unknown) => void
  errors: Record<string, string>
  onNext: () => void
}

export function StepFive({ userData, updateUserData, errors, onNext }: StepFiveProps) {
  const goals = [
    "Subscription costs",
    "Tool usage & engagement",
    "Unused/duplicate tools",
    "Personalized tool suggestions",
  ]

  const handleGoalChange = (goal: string, checked: boolean) => {
    const currentGoals = userData.goals || []

    if (checked) {
      updateUserData("goals", [...currentGoals, goal])
    } else {
      updateUserData(
        "goals",
        currentGoals.filter((g) => g !== goal),
      )
    }
  }

  return (
    <div className="flex flex-col max-w-[650px]">
      <h1 className="text-2xl font-bold text-[#9013FE]">
        What Do You Want to Track or Improve?
      </h1>

      <p className="mt-4 text-[#2D3436] leading-[1.6]">
        This helps us personalize your dashboard and features.
      </p>

      <div className="mt-8 space-y-2">
        <div className="flex flex-col">
          <h2 className="text-base font-bold">
            Select your goals.{" "}
            {!errors.goals && "Please select at least one option"}
          </h2>
          <p
            className={`text-sm ${
              errors.goals ? "text-[#D63031]" : "text-gray-500"
            }`}
          >
            {errors.goals && "Please select at least one option"}
          </p>
        </div>

        <div className="space-y-8 mt-6">
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              {/* <Checkbox
                id={`goal-${goal}`}
                checked={userData.goals?.includes(goal)}
                onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
              /> */}
              <input
                type="checkbox"
                id={`goal-${goal}`}
                checked={userData.goals?.includes(goal)}
                onChange={(e) => handleGoalChange(goal, e.target.checked)}
                className="h-3 w-3 cursor-pointer"
              />
              <Label htmlFor={`goal-${goal}`} className="cursor-pointer">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <button
          onClick={onNext}
          className="w-full rounded-xl cursor-pointer bg-[#9013FE] py-3 text-white font-semibold text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

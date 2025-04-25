"use client";

import type { UserData } from "./OnboardingForm";
import { Label } from "@/components/ui/label";


interface StepTwoProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: unknown) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

export function StepTwo({
  userData,
  updateUserData,
  errors,
  onNext,
}: StepTwoProps) {
  const handleRoleChange = (value: string) => {
    updateUserData("role", value);
  };

  const handleWorkTypeChange = (type: string, checked: boolean) => {
    const currentTypes = userData.workTypes || [];
    if (checked) {
      updateUserData("workTypes", [...currentTypes, type]);
    } else {
      updateUserData(
        "workTypes",
        currentTypes.filter((t) => t !== type)
      );
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold leading-[1.6] text-[#9013FE]">
        About You
      </h1>
      <p className="mt-4 text-[#2D3436] leading-[1.6]">
        Help us tailor your library by telling us a bit about yourself.
      </p>

      <div className="mt-8 space-y-8">
        <div className="space-y-2">
          <div className="flex flex-col mb-3">
            <h2 className="text-base font-bold">
              What best describes you?{" "}
              {!errors.role && "Please select an option"}
            </h2>
            <p
              className={`text-sm ${
                errors.role ? "text-[#D63031]" : "text-gray-500"
              }`}
            >
              {errors.role && "Please select an option"}
            </p>
          </div>

          <div className="space-y-6">
            {["Freelancer", "Solo entrepreneur", "Small team", "Creator"].map(
              (role) => (
                <div key={role} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={userData.role === role}
                    onChange={() => handleRoleChange(role)}
                    id={role}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={role}
                    className="cursor-pointer text-[#2D3436]"
                  >
                    {role}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col mb-3">
            <h2 className="text-base font-bold">
              What kind of work do you do?{" "}
              {!errors.workTypes && "Please select at least one option"}
            </h2>
            <p
              className={`text-sm ${
                errors.workTypes ? "text-[#D63031]" : "text-gray-500"
              }`}
            >
              {errors.workTypes && "Please select at least one option"}
            </p>
          </div>

          <div className="space-y-6">
            {["Design", "Development", "Writing", "Marketing", "Other"].map(
              (type) => (
                <div key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`work-${type}`}
                    checked={userData.workTypes?.includes(type) || false}
                    onChange={(e) =>
                      handleWorkTypeChange(type, e.target.checked)
                    }
                    className="h-3 w-3 cursor-pointer"
                  />
                  <Label
                    htmlFor={`work-${type}`}
                    className="cursor-pointer text-[#2D3436]"
                  >
                    {type}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
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

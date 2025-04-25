"use client"

import { useState } from "react";
import { OnboardingModal } from "./OnboardingModal";


export function StepSix() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
      setIsModalOpen(true)
    }
  
    const closeModal = () => {
      setIsModalOpen(false)
    }

  return (
    <div className="flex flex-col h-[50vh]">
      <h1 className="text-2xl font-bold text-[#9013FE]">Setup Complete!</h1>

      <p className="mt-4 text-[#2D3436] leading-[1.6]">
        Your Flowva library is ready to use. We&apos;ll take you to your dashboard now where you can start organizing
        your tools and tracking your productivity.
      </p>

      <div className="mt-auto pt-32">
        <button
          onClick={openModal}
          className="w-full rounded-xl cursor-pointer bg-[#9013FE] py-3 text-white font-semibold text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
        >
           Go to Dashboard
         </button>
      </div>

     <OnboardingModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

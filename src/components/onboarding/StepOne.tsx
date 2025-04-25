"use client"

interface StepOneProps {
  onNext: () => void
}

export function StepOne({ onNext }: StepOneProps) {
  return (
    <div className="flex flex-col justify-between h-[50vh]">
       <div className="flex flex-col justify-center flex-1">
        <h1 className="text-[1.5rem] sm:text-[2rem] leading-[1.6] font-bold text-[#9013FE]">
          Welcome to Flowva
        </h1>

        <p className="mt-4 text-[#2D3436] text-sm sm:text-base leading-[1.6]">
          Your smart library for organizing tools, tracking usage, and turning
          productivity into rewards. Let&apos;s set up your digital library in 2
          minutes.
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full rounded-xl cursor-pointer bg-[#9013FE] py-3 text-white font-semibold text-sm md:text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
        >
          Let&apos;s Go
        </button>
      </div>
    </div>
  );
}

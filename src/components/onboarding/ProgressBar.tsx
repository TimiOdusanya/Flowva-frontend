interface ProgressBarProps {
    currentStep: number
    totalSteps: number
  }
  
  export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100
  
    return (
      <div className="h-[6px] w-full rounded-[3px] bg-[#e0e0e0]">
        <div
          className="h-full rounded-[3px] bg-[#9013FE] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }
  
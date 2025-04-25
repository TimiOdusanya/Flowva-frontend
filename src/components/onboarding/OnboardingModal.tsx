"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

interface OnboardingCompleteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingCompleteModalProps) {
  const router = useRouter()

  const handleOkClick = () => {
    onClose()
    router.push("/dashboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[360px] max-w-[360px] rounded-[12px] p-0 border-0 shadow-lg bg-white">
        <div className="flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold text-[#9013FE] mb-6">Onboarding Complete!</h2>
        <p className="text-[#2D3436] leading-[1.6] mb-6">Taking you to your dashboard now.</p>
          <Button
            onClick={handleOkClick}
            className="rounded-xl cursor-pointer bg-[#9013FE] p-6 text-white font-semibold text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type { UserData } from "./OnboardingForm"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StepFourProps {
  userData: UserData
  updateUserData: (field: keyof UserData, value: unknown) => void
  onNext: () => void
  onSkip: () => void
}

interface Tool {
  id: string
  name: string
  icon: string
}

export function StepFour({ userData, updateUserData, onNext, onSkip }: StepFourProps) {
  const tools: Tool[] = [
    { id: "notion", name: "Notion", icon: "📝" },
    { id: "trello", name: "Trello", icon: "📋" },
    { id: "slack", name: "Slack", icon: "💬" },
    { id: "clickup", name: "ClickUp", icon: "✅" },
    { id: "canva", name: "Canva", icon: "🎨" },
    { id: "zapier", name: "Zapier", icon: "⚡" },
    { id: "stripe", name: "Stripe", icon: "💳" },
    { id: "figma", name: "Figma", icon: "✏️" },
    { id: "calendly", name: "Calendly", icon: "📅" },
  ]

  const toggleTool = (toolId: string) => {
    const currentTools = userData.tools || []

    if (currentTools.includes(toolId)) {
      updateUserData(
        "tools",
        currentTools.filter((id) => id !== toolId),
      )
    } else {
      updateUserData("tools", [...currentTools, toolId])
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-[#9013FE]">Your Tool Stack</h1>

      <p className="mt-4 text-[#2D3436]">
        Which tools are part of your workflow? We&apos;ll pre-load and organize them in your library.
      </p>

      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => toggleTool(tool.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl border border-[#ddd] transition-all",
                "hover:border-[#9013FE]",
                userData.tools?.includes(tool.id) ? "bg-[#A29BFE] border-[#9013FE]" : "bg-white",
              )}
            >
              <span className="text-2xl mb-2">{tool.icon}</span>
              <span className="text-sm font-medium">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[#666] text-sm">You can always add more tools later in your library settings.</p>


      <div className="mt-auto pt-15 flex items-center w-[100%]">
        <button onClick={onNext} 
         className="w-[60%] rounded-xl cursor-pointer bg-[#9013FE] py-3 text-white font-semibold text-base hover:bg-[#A29BFE] transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
        >
          Continue
        </button>

        <Button onClick={onSkip} variant="ghost" className="text-[#2D3436] hover:text-[#9013FE]">
        Skip – I&apos;ll add them later
        </Button>
      </div>

    </div>
  )
}

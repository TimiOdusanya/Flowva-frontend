/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Logo from "@/components/shared/Logo"
import { useMutation } from '@tanstack/react-query'
import { verifyEmailAPI, ResponseData } from '@/api/endpoints/auth'

export default function VerifyOTPForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
      return
    }
    setEmail(storedEmail)

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [router])

  const mutation = useMutation<ResponseData, unknown, { email: string; otp: string }>({
    mutationFn: (data) => verifyEmailAPI(data),
    onMutate: () => {
      setStatus('loading')
      setMessage('Verifying OTP...')
    },
    onSuccess: () => {
        setStatus('success')
        setMessage('OTP verified successfully!')
        setTimeout(() => {
          router.push('/reset-password')
        }, 2000)
    },
    onError: (error: any) => {
        const errorMessage = error?.data?.message || "An unexpected error occurred. Please try again."
      setStatus('error')
      setMessage(errorMessage || 'An error occurred')
    },
  })

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    const focusIndex = Math.min(pastedData.length, 5)
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    mutation.mutate({ email, otp: otpValue })
  }

  const handleResendOTP = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "New OTP has been sent to your email",
      })
    } catch (err) {
      console.log("err", err)
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <div className="gradient-header"></div>

      <div className="auth-header">
        <Logo />
        <h2 className="auth-title">Verify OTP</h2>
      </div>

      <div className="mt-4">
          {status === 'loading' && (
            <div className="auth-alert auth-alert-success">Verifying OTP...</div>
          )}
          {status === 'success' && (
            <div className="auth-alert auth-alert-success">{message}</div>
          )}
          {status === 'error' && (
            <div className="auth-alert auth-alert-error">{message}</div>
          )}
        </div>

      <div className="mb-6 text-center">
        <p className="text-gray-600">
          We&apos;ve sent a verification code to your email address. Please enter the 6-digit code below.
        </p>
        <p className="text-sm text-gray-500 mt-2">{email}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-medium rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              required
            />
          ))}
        </div>

        <button type="submit" className="auth-button" disabled={mutation.isPending}>
          Verify OTP
          <ArrowRight size={20} />
        </button>

       
      </form>

      <div className="auth-footer">
        Didn&apos;t receive the code?{" "}
        <button onClick={handleResendOTP} className="auth-link" disabled={isLoading}>
          Resend OTP
        </button>
      </div>
    </div>
  )
}
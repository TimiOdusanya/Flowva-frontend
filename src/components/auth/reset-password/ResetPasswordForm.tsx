"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import Logo from "@/components/shared/Logo"
import { APIError, resetPasswordAPI, ResponseData } from "@/api/endpoints/auth"

export default function ResetPasswordForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const validatePassword = (password: string): boolean => {
    return password.length >= 8
  }


  const mutation = useMutation<ResponseData, APIError, { email: string; newPassword: string }>({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      setSuccessMessage("Password is successfully reset!")
        setTimeout(() => {
          sessionStorage.removeItem("resetEmail")
          router.push("/sign-in")
        }, 2000)
    },
    onError: (error) => {
      setErrorMessage(error?.data?.message || "An unexpected error occurred. Please try again.")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSuccessMessage(null)
    setErrorMessage(null)

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 8 characters with a mix of letters, numbers & symbols")
      return
    }
    
    mutation.mutate({ email, newPassword: password })
  }

  return (
    <div className="auth-card">
      <div className="gradient-header"></div>

      <div className="auth-header">
        <Logo />
        <h2 className="auth-title">Set new password</h2>
      </div>

      <div className="mb-6 text-center">
        <p className="text-gray-600">Create a new password for your account</p>
        <p className="text-sm text-gray-500 mt-2">{email}</p>
      </div>

      {/* Inline alerts for loading, success, and error */}
      {mutation.isPending && (
        <div className="auth-alert auth-alert-success mb-4">
          <p>Resetting password...</p>
        </div>
      )}
      {successMessage && (
        <div className="auth-alert auth-alert-success mb-4">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="auth-alert auth-alert-error mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label htmlFor="password" className="auth-label">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="auth-input pr-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="text-sm cursor-pointer">Hide</span>
              ) : (
                <span className="text-sm cursor-pointer">Show</span>
              )}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </button>
          </div>
          {password && (
            <div className="mt-1">
              <div
                className={`h-1 ${validatePassword(password) ? "bg-green-500" : "bg-yellow-500"} rounded-full`}
              ></div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters with a mix of letters, numbers & symbols
              </p>
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="auth-input pr-12"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <span className="text-sm cursor-pointer">Hide</span>
              ) : (
                <span className="text-sm cursor-pointer">Show</span>
              )}
              <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
            </button>
          </div>
        </div>

        <button type="submit" className="auth-button" disabled={mutation.isPending}>
          <Save size={20} />
          Reset Password
        </button>
      </form>
    </div>
  )
}
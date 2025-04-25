/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Bookmark } from "lucide-react"
import Logo from "@/components/shared/Logo"
import { useMutation } from '@tanstack/react-query'
import { signUp } from '@/api/endpoints/auth'

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
        console.log("dataaa", data)
        setSuccess("Account created successfully! Welcome to Flowva.")
        setTimeout(() => {
          router.push("/sign-in")
        }, 2000)
    },
    onError: (error: any) => {

        console.log("errorr", error)
      setError(error?.data?.message)
    },
  })

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters with a mix of letters, numbers & symbols")
      return
    }

    mutation.mutate({ email, password })
  }

  return (
    <div className="auth-card">
      <div className="gradient-header"></div>

      <div className="auth-header">
        <Logo />
        <h2 className="auth-title">Join Flowva today</h2>
      </div>

      {error && (
        <div className="auth-alert auth-alert-error">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="auth-alert auth-alert-success">
          <p>{success}</p>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSignUp}>
        <div className="auth-input-group">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="password" className="auth-label">
            Password
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
              <div className="h-1 bg-[#eeeeee] rounded-full relative">
                <div
                  className="h-1 rounded-full absolute top-0 left-0"
                  style={{
                    width: `${password.length < 8 ? (password.length / 8) * 100 : 100}%`,
                    backgroundColor: password.length < 8 ? '#FF5252' : (
                      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)
                      ? '#10B981' : '#FFC107'
                    )
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters with a mix of letters, numbers & symbols
              </p>
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm Password
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
          <Bookmark size={20} />
          {mutation.isPending ? "Creating account..." : "Create account"}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or continue with</span>
          <div className="auth-divider-line"></div>
        </div>

        <button
          type="button"
          className="w-full py-3 rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Google
        </button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <Link href="/sign-in" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  )
}
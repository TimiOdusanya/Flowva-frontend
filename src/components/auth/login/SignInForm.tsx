/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { LogIn } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Logo from "@/components/shared/Logo"
import { useMutation } from '@tanstack/react-query'
import { loginAPI } from '@/api/endpoints/auth'
import { saveToken } from "@/utils/auth"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [googleLoading, setGoogleLoading] = useState(false)
    const [success, setSuccess] = useState("")
     const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

console.log(status)
const mutation = useMutation({
    mutationFn: loginAPI,
    onMutate: () => {
      setStatus("loading") 
      setSuccess("Signing in...");
    },
    onSuccess: (response) => {
      if (response?.accessToken) {
        saveToken(response.accessToken);
      }
      
      setStatus("success")
      setSuccess("Welcome back!, Redirecting...")
      toast({
        title: "Success",
        description: "Account login successful!",
      })
      router.push("/dashboard")
    },
    onError: (error: any) => {
      setSuccess("");
      const errorMessage = error?.data?.message || "An unexpected error occurred. Please try again."
      setError(errorMessage)
    },
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <Logo />
        <h2 className="auth-title">Welcome back</h2>
      </div>

      {googleLoading && (
        <div
          className="auth-alert border-[#4CAF50] text-[#4CAF50]"
          style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}
        >
          <p>Redirecting to Google...</p>
        </div>
      )}

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

      <form className="auth-form" onSubmit={handleSignIn}>
        <div className="auth-input-group">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="auth-input-group">
          <div className="flex justify-between">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="auth-input pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-500 hover:text-[#7C4DFF]"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={mutation.isPending}
        >
          <LogIn size={20} />
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or continue with</span>
          <div className="auth-divider-line"></div>
        </div>

        <button
          type="button"
          className="w-full cursor-pointer py-3 rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-400 ease-in-out hover:transform hover:translate-y-[-2px]"
          onClick={() => setGoogleLoading(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
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
        Don&apos;t have an account?
        <Link href="/sign-up" className="auth-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}
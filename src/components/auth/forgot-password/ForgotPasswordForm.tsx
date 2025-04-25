/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Logo from "@/components/shared/Logo"
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/api/endpoints/auth'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => {
      setError("");
      setSuccess("Sending reset link...");
    },
    onSuccess: () => {
      setSuccess("OTP sent to your email");
      toast({
        title: "Success",
        description: "OTP has been sent to your email",
      });
      sessionStorage.setItem("resetEmail", email);
      router.push("/verify-otp");
    },
    onError: (error: any) => {
      setSuccess("");
      const errorMessage = error?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email })
  }

  return (
    <div className="auth-card">
      <div className="gradient-header"></div>

      <div className="auth-header">
        <Logo />
        <h2 className="auth-title">Reset your password</h2>
      </div>

      {success && (
        <div className="auth-alert auth-alert-success">
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="auth-alert auth-alert-error">
          <p>{error}</p>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="auth-button" disabled={mutation.isPending}>
          <Mail size={20} />
          {mutation.isPending ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <div className="auth-footer">
        Remember your password?{" "}
        <Link href="/sign-in" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  )
}
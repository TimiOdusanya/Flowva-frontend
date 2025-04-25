/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    SignUpData,
    SignInData,
    ForgotPasswordData,
    VerifyOTPData,
    ResetPasswordData,
    ApiResponse,
    User,
  } from "./auth-types"
  

  const API_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_STAGING
    : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;
  
 
  async function apiRequest<T>(endpoint: string, method = "GET", data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw {
          status: response.status,
          ...result,
        }
      }
  
      return result
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || "An unexpected error occurred",
          ...error,
        },
      }
    }
  }
  

  export async function signUp(data: SignUpData): Promise<ApiResponse<User>> {
    return apiRequest<User>("/auth/signup", "POST", data)
  }
  
  export async function signIn(data: SignInData): Promise<ApiResponse<{ user: User; accessToken: string }>> {
    return apiRequest<{ user: User; accessToken: string }>("/auth/login", "POST", data)
  }
  
  export async function forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    return apiRequest("/auth/forgot-password", "POST", data)
  }
  
  export async function verifyOTP(data: VerifyOTPData): Promise<ApiResponse> {
    return apiRequest("/auth/verify", "POST", data)
  }
  
  export async function verifyForgotPasswordOTP(data: VerifyOTPData): Promise<ApiResponse> {
    return apiRequest("/auth/verify-forgot-password", "POST", data)
  }
  
  export async function resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
    return apiRequest("/auth/reset-password", "PUT", data)
  }
  
  export async function resendVerificationOTP(data: { email: string }): Promise<ApiResponse> {
    return apiRequest("/auth/resend-verification", "POST", data)
  }
  
  export async function logout(): Promise<ApiResponse> {
    return apiRequest("/auth/logout", "POST")
  }
  
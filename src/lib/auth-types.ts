export interface SignUpData {
    email: string
    password: string
  }
  
  export interface SignInData {
    email: string
    password: string
  }
  
  export interface ForgotPasswordData {
    email: string
  }
  
  export interface VerifyOTPData {
    email: string
    otp: string
  }
  
  export interface ResetPasswordData {
    email: string
    newPassword: string
  }
  
  export interface ApiResponse<T = unknown> {
    success: boolean
    message?: string
    data?: T
    error?: {
      message: string
      [key: string]: unknown
    }
  }
  
  export interface User {
    id: string
    email: string
    isVerified: boolean
  }
  
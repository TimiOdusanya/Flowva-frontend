import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm"
import Head from "next/head"

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password - Flowva</title>
      </Head>
      <ForgotPasswordForm />
    </>
  )
}

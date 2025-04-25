import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm"
import Head from "next/head"

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password - Flowva</title>
      </Head>
      <ResetPasswordForm />
    </>
  )
}

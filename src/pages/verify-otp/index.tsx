import VerifyOTPForm from "@/components/auth/verify/VerifyOTPForm"
import Head from "next/head"

export default function VerifyOTPPage() {
  return (
    <>
      <Head>
        <title>Verify OTP - Flowva</title>
      </Head>
      <VerifyOTPForm />
    </>
  )
}

import SignInForm from "@/components/auth/login/SignInForm"
import Head from "next/head"

export default function LogInPage() {
  return (
    <>
      <Head>
        <title>Sign In - Flowva</title>
      </Head>
      <SignInForm />
    </>
  )
}

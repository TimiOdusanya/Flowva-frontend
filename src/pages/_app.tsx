import "@/styles/globals.css";
import type React from "react";
import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/lib/query"
import { useRouter } from "next/router"
import AuthLayout from "@/components/layouts/AuthLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router

  const isAuthPage = ["/sign-up", "/sign-in", "/forgot-password", "/reset-password", "/verify-otp"].some(
    (path) => pathname.startsWith(path)
  );
  


  return (
    <>
      <ReactQueryProvider>
      <Head>
        <title>Flowva - Your Smart Tool Library</title>
        <meta
          name="description"
          content="Organize tools, track usage, and turn productivity into rewards"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      {isAuthPage ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <main className={`flex justify-center`}>
            <Component {...pageProps} />
          </main>
        )}

        
        <Toaster />
      </ReactQueryProvider>
    </>
  )
}

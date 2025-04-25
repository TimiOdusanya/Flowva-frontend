import withAuth from "@/components/auth/WithAuth";
import DashboardView from "@/components/dashboard/DashboardView"
import Head from "next/head"

function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Flowva</title>
      </Head>
      <DashboardView />
    </>
  )
}


export default withAuth(DashboardPage);

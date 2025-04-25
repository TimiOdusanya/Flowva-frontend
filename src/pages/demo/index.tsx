import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>How Flowva Works - Demo</title>
        <meta name="description" content="See how Flowva helps you organize your productivity tools" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <Link href="/" className="text-gray-700 hover:text-purple-600 flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">How Flowva Works</h1>

              <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
                <Image
                  src="/images/flowva-video.png?height=720&width=1280"
                  alt="Flowva Demo Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-purple-600 text-white rounded-full p-4 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  Flowva helps you organize your productivity tools, track usage, and earn rewards for being productive.
                  Watch the demo above to see how it works, or sign up for free to get started.
                </p>

                <div className="flex justify-center mt-8">
                  <Link href="/onboarding">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">Get Started Free</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

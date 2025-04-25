"use client"

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Layers, Zap } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function Home() {
 
  return (
    <>
      <Head>
        <title>Flowva - Your Smart Tool Library</title>
        <meta
          name="description"
          content="Organize tools, track usage, and turn productivity into rewards with Flowva"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col w-full">
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
            <Logo />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-[#7C4DFF]"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button className="bg-[#7C4DFF] hover:bg-purple-700 text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-100 rounded-full blur-3xl opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-60 transform -translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                    <span className="text-sm font-medium">
                      Introducing Flowva
                    </span>
                    <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Your Smart Library for{" "}
                    <span className="text-purple-600">Productivity Tools</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Organize your tools, track usage, and turn productivity into
                    rewards. Flowva helps you manage your digital workspace more
                    efficiently.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/onboarding">
                      <Button className="bg-[#7C4DFF] hover:bg-purple-700 text-white h-12 px-8 text-base">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/demo">
                      <Button
                        variant="outline"
                        className="border-purple-200 text-[#7C4DFF] h-12 px-8 text-base"
                      >
                        See How It Works
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src="/images/flowva-img.png?height=900&width=1600"
                      alt="Flowva Dashboard"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-4">
                      <BarChart2 size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Track Usage</h3>
                    <p className="text-gray-600">
                      Monitor how you use your tools and identify opportunities
                      to optimize your workflow.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-4">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Organize Tools
                    </h3>
                    <p className="text-gray-600">
                      Keep all your productivity tools in one place and access
                      them with a single click.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-4">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
                    <p className="text-gray-600">
                      Turn your productivity into rewards and incentives that
                      keep you motivated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Link href="/">
            <Logo />
            </Link>
              </div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Flowva. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

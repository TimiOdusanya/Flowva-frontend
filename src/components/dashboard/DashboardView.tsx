"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Home, BarChart2, Users, Settings, Bell, Search, LogOut, Menu, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Logo from "../shared/Logo"
import Link from "next/link"
import { logoutAPI } from "@/api/endpoints/auth"
import { removeToken } from "@/utils/auth"

export default function DashboardView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const response = await logoutAPI();
      removeToken();
      console.log("ress",response)
      toast({
        title: "Error",
        description: "Successfully logged out",
        variant: "destructive",
      });
      router.push("/sign-in");
      window.location.href = "/sign-in";
    } catch (error) {
        toast({
            title: "Error",
            description: "Logout Failed",
            variant: "destructive",
          });
      console.error("An error occurred during logout:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
    
      <header className="bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between md:hidden">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-1">
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
        >
          <div className="flex flex-col h-full">
           
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
            </div>

            
            <nav className="flex-1 p-4 space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-2 rounded-md bg-purple-50 text-purple-700"
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                Analytics
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Users className="w-5 h-5 mr-3" />
                Team
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </a>
            </nav>


            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center px-3 py-2 w-full text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

          
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">
                Welcome to your Dashboard
              </h2>
              <p className="text-gray-600">
                You&apos;ve successfully signed in to your account. This is a
                sample dashboard page.
              </p>
            </div>

       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Total Users
                </h3>
                <p className="text-2xl font-bold">1,234</p>
                <div className="mt-2 text-sm text-green-600">
                  +12% from last month
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Active Projects
                </h3>
                <p className="text-2xl font-bold">42</p>
                <div className="mt-2 text-sm text-green-600">
                  +7% from last month
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Completed Tasks
                </h3>
                <p className="text-2xl font-bold">789</p>
                <div className="mt-2 text-sm text-red-600">
                  -3% from last month
                </div>
              </div>
            </div>

        
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

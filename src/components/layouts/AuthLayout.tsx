import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full px-2 py-4 bg-[linear-gradient(135deg,#EDE7F6_0%,#f5f5fa_100%)] flex justify-center items-center overflow-y-auto">
        {children}
    </div>
  )
}

export default AuthLayout
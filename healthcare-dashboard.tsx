"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, ChevronDown, ExternalLink, Mail, Search, Smartphone, TriangleAlert } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./contexts/auth-context"
import { useState } from "react"
import DashboardPage from "./components/dashboard-page"
import PlanPage from "./components/plan-page"

function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" className="flex items-center space-x-1 text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.initials}
        </div>
        <span className="text-sm font-medium">{user?.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <div className="font-medium">{user?.name}</div>
              <div className="text-gray-500">{user?.email}</div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Component() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleOpenSupportChat = () => {
    window.open("https://holographic-shell-17q41m.sandbox.livekit.io", "_blank")
  }

  if (!user) {
    return null // This will be handled by the main app component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/healthpartners-logo.png" alt="HealthPartners" className="h-8 w-auto" />
              </div>

              {/* Navigation Links */}
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "dashboard"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My dashboard
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "care"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My care
                </button>
                <button
                  onClick={() => setActiveTab("plan")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "plan"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My plan
                </button>
              </nav>
            </div>

            {/* Right side icons and user menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Content based on active tab */}
      {activeTab === "dashboard" ? (
        <DashboardPage onOpenSupportChat={handleOpenSupportChat} />
      ) : activeTab === "care" ? (
        /* Your care team content */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Your care team</h1>

            {/* Warning Alert */}
            <Alert className="mb-8 border-orange-200 bg-orange-50">
              <TriangleAlert className="h-5 w-5 text-orange-600" />
              <AlertDescription className="text-gray-700">
                <span className="font-medium">Some options on this page aren't available to you.</span> Due to privacy
                laws, certain online account features are restricted if you're under 18. Please call your clinic if you
                need help with your care or medical records.
              </AlertDescription>
            </Alert>

            {/* Instructions */}
            <div className="text-center mb-8 space-y-4">
              <p className="text-gray-700">
                Start here to see doctors you've visited recently and make new appointments.
              </p>
              <p className="text-gray-700">
                Go to your{" "}
                <Link href="#" className="text-blue-600 underline hover:text-blue-800">
                  account settings
                </Link>{" "}
                to request access to a child's care team, or grant someone access to yours.{" "}
                <Link href="#" className="text-blue-600 underline hover:text-blue-800 inline-flex items-center">
                  Learn about proxy access (PDF)
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </p>
            </div>

            {/* Virtuwell Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="relative">
                      <Smartphone className="h-8 w-8 text-purple-600" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Virtuwell online clinic</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Skip the trip and start your visit anytime with Virtuwell. Certified practitioners treat over 60
                    common conditions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      ) : activeTab === "plan" ? (
        <PlanPage />
      ) : null}

      {/* Floating Support Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="w-20 h-20 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 p-0"
          onClick={handleOpenSupportChat}
        >
          <img src="/support-icon.png" alt="Customer Support" className="w-12 h-12" />
        </Button>
      </div>
    </div>
  )
}

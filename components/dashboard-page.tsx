"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, CreditCard, Receipt, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../contexts/auth-context"

type DashboardPageProps = {}

export default function DashboardPage({}: DashboardPageProps) {
  const { user } = useAuth()

  if (!user) return null

  const quickAccessItems = [
    {
      icon: Calendar,
      title: "Appointments",
      subtitle: "1 upcoming",
      color: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Test results",
      subtitle: "0 unread",
      color: "text-purple-600",
    },
    {
      icon: Receipt,
      title: "Bills",
      subtitle: "0 balances due",
      color: "text-purple-600",
    },
    {
      icon: CreditCard,
      title: "Explanation of Benefits (EOBs)",
      subtitle: "",
      color: "text-purple-600",
    },
  ]

  const memberResources = [
    { title: "Make an appointment", href: "#" },
    { title: "Message your care team", href: "#" },
    { title: "Find our doctors or clinics", href: "#" },
    { title: "Review your coverage", href: "#" },
    { title: "Contact us", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purple Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">Hello, {user.name.split(" ")[0]}</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Content - Main Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preferences Card */}
            <Card className="bg-white border-l-4 border-l-purple-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Share your preferences with us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    We want to ensure you feel welcomed, included and valued by personalizing your experience. Go to
                    "Account settings," navigate to "About me" and select the attributes you want to disclose.
                  </CardDescription>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    If you've already shared your information or would prefer not to disclose, there's nothing you need
                    to do.
                  </CardDescription>
                  <Button className="bg-blue-600 hover:bg-blue-700">Get started</Button>
                </div>
              </CardContent>
            </Card>

            {/* Clara AI Card */}
            <Card className="bg-white border-l-4 border-l-purple-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Clara, your 24/7 symptom guide (AI powered)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Meet Clara, a digital guide that helps you navigate the best route for your care based on symptoms,
                    urgency, and available options. Tell Clara how you're feeling. She'll gently walk you through next
                    steps and get you the help you need.
                  </CardDescription>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open("https://holographic-shell-17q41m.sandbox.livekit.io/", "_blank")}
                  >
                    Find care with Clara
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Access Items */}
            <div className="space-y-4">
              {quickAccessItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card key={index} className="bg-white hover:shadow-md transition-shadow cursor-pointer shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className={`h-5 w-5 ${item.color}`} />
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            {item.subtitle && (
                              <p
                                className={`text-sm ${item.subtitle.includes("upcoming") ? "text-green-600" : "text-gray-600"}`}
                              >
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Member Resources */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Member and patient resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {memberResources.map((resource, index) => (
                    <Link
                      key={index}
                      href={resource.href}
                      className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

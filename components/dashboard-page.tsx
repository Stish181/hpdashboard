"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../contexts/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Hello, {user.name}</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Welcome Card */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Feel confident managing your own health care</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                    When you turn 18, you start a new stage of life - you control your health care. And as your trusted
                    health care partner, we're here for you for all of it. Our health system has a wide network of
                    clinics, hospitals and centers so you can continue to get care where you want to.
                  </CardDescription>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">View my appointments</Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Tips for success
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* EOB Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Explanation of Benefits (EOBs)</CardTitle>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">MOST RECENT</p>
                      <p className="text-sm font-medium text-gray-900">{user.eobData.provider}</p>
                      <p className="text-xs text-gray-500">{user.eobData.date}</p>
                      <p className="text-xs text-gray-600 mt-1">{user.eobData.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total cost:</span>
                        <span className="font-medium">{user.eobData.totalCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">My responsibility:</span>
                        <span className="font-medium">{user.eobData.responsibility}</span>
                      </div>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                      View EOB
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Member resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Find a doctor or clinic
                  </Link>
                  <Link href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Review your coverage
                  </Link>
                  <Link href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Contact us
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Mammogram Card */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  It's time to talk to your doctor about mammograms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  Once you're close to your 40s, it's time to have a conversation with your doctor about regular
                  screening mammograms. Your doctor will work with you to determine the best screening schedule based on
                  your family history and risk factors, whether that's now or later.{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    Learn more
                  </Link>
                </CardDescription>
                <Button className="bg-blue-600 hover:bg-blue-700">Find an in-network provider</Button>
              </CardContent>
            </Card>

            {/* Cost Estimation Card */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Estimate your out-of-pocket costs for upcoming care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  Getting the most out of your health plan coverage includes making informed health care choices and
                  finding quality care that fits your budget. These tools take your personal coverage into account to
                  help you estimate costs for future care.
                </CardDescription>
                <Button className="bg-blue-600 hover:bg-blue-700">Estimate your costs</Button>
              </CardContent>
            </Card>

            {/* Mental Health Card */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Support for your mental and emotional health</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  We all go through ups and downs, but you don't have to manage them alone. As a HealthPartners member,
                  you have no cost resources to support you in managing and overcoming challenges with stress, anxiety,
                  depression, sleep and more.
                </CardDescription>
                <Button className="bg-blue-600 hover:bg-blue-700">Learn more about your resources</Button>
              </CardContent>
            </Card>

            {/* Health and Fitness Perks Card */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Health and fitness perks</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  As a HealthPartners member, you have access to discounts for retailers and services through your
                  health plan. Save big on fitness classes and memberships, meal planning services, eyewear, personal
                  care products, and more.
                </CardDescription>
                <Button className="bg-blue-600 hover:bg-blue-700">Get your healthy discounts</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar - empty for larger screens, content moves to mobile */}
          <div className="lg:col-span-1">{/* This space can be used for additional sidebar content if needed */}</div>
        </div>
      </main>
    </div>
  )
}

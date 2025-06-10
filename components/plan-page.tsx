"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stethoscope, CreditCard, PiggyBank, FileText, DollarSign, Info, ChevronDown, ExternalLink } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import { useState } from "react"

export default function PlanPage() {
  const { user } = useAuth()
  const [activeSubTab, setActiveSubTab] = useState("overview")

  const planFeatures = [
    {
      icon: Stethoscope,
      title: "Review your coverage",
      description: "See your health plan's benefits and check who's covered.",
      buttonText: "Review coverage",
      action: () => console.log("Review coverage clicked"),
    },
    {
      icon: CreditCard,
      title: "Get ID cards",
      description: "View and print ID cards for easier access when you get care.",
      buttonText: "Get an ID card",
      action: () => console.log("Get ID card clicked"),
    },
    {
      icon: PiggyBank,
      title: "Manage spending accounts",
      description: "Review account balances and other details for your FSA or HRA.",
      buttonText: "Go to spending accounts",
      buttonIcon: ExternalLink,
      action: () => console.log("Spending accounts clicked"),
    },
    {
      icon: FileText,
      title: "Find a form",
      description: "Make an authorization, get coverage verification, fill out a request and more.",
      buttonText: "Find a form",
      action: () => console.log("Find form clicked"),
    },
    {
      icon: DollarSign,
      title: "Estimate costs",
      description: "Check out our tools to help get a sense of your expected out-of-pocket costs.",
      buttonText: "See cost estimate tools",
      action: () => console.log("Cost estimate clicked"),
    },
  ]

  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "claims", label: "Claims", hasDropdown: true },
    { id: "spending", label: "Spending", hasDropdown: true },
    { id: "findcare", label: "Find care" },
    { id: "pharmacy", label: "Pharmacy" },
    { id: "programs", label: "Programs & perks" },
    { id: "idcard", label: "ID card" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sub Navigation */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center space-x-1 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSubTab === tab.id
                    ? "text-white border-white"
                    : "text-purple-200 border-transparent hover:text-white hover:border-purple-300"
                }`}
              >
                <span>{tab.label}</span>
                {tab.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Maintenance Banner */}
      <Alert className="mx-4 sm:mx-6 lg:mx-8 mt-6 border-blue-200 bg-blue-50">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-gray-700">
          <span className="font-medium">We're doing some maintenance on Tuesday, Jan. 4 from 7 to 9 p.m.</span>{" "}
          Submitting HRA and FSA claims may not be available. Thanks for your patience!
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome back to your plan, {user?.name || "Ji**"}</h1>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {planFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            const ButtonIcon = feature.buttonIcon

            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-2 border-purple-200">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={feature.action}>
                    <span>{feature.buttonText}</span>
                    {ButtonIcon && <ButtonIcon className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

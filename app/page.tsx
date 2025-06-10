"use client"

import { AuthProvider, useAuth } from "../contexts/auth-context"
import LoginForm from "../components/login-form"
import HealthcareDashboard from "../healthcare-dashboard"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img src="/healthpartners-logo.png" alt="HealthPartners" className="h-12 w-auto mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? <HealthcareDashboard /> : <LoginForm />
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

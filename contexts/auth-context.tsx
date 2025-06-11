"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  initials: string
  eobData: {
    provider: string
    date: string
    totalCost: string
    responsibility: string
    description: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers: Record<string, User> = {
  "tina.fey@healthpartners.com": {
    id: "1",
    name: "Tina Fey",
    email: "tina.fey@healthpartners.com",
    initials: "TF",
    eobData: {
      provider: "Comedy Central Medical",
      date: "12/20/2024",
      totalCost: "$275.00",
      responsibility: "$35.00",
      description: "Annual comedy wellness check and stress management",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("healthcare_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - check if user exists and password is correct
    const userData = mockUsers[email]
    if (userData && password === "password123") {
      setUser(userData)
      localStorage.setItem("healthcare_user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthcare_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

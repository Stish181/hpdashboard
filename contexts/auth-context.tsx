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
  "patient@healthpartners.com": {
    id: "1",
    name: "John Smith",
    email: "patient@healthpartners.com",
    initials: "JS",
    eobData: {
      provider: "Associated Skin Care Specialists",
      date: "9/9/2024",
      totalCost: "$358.00",
      responsibility: "$0.00",
      description: "Dermatology consultation and treatment",
    },
  },
  "sara.mitchell@healthpartners.com": {
    id: "2",
    name: "Sara Mitchell",
    email: "sara.mitchell@healthpartners.com",
    initials: "SM",
    eobData: {
      provider: "Urgent Care Center",
      date: "12/15/2024",
      totalCost: "$185.00",
      responsibility: "$25.00",
      description: "UTI diagnosis and treatment",
    },
  },
  "john.doe@healthpartners.com": {
    id: "3",
    name: "John Doe",
    email: "john.doe@healthpartners.com",
    initials: "JD",
    eobData: {
      provider: "Family Medicine Clinic",
      date: "11/22/2024",
      totalCost: "$420.00",
      responsibility: "$50.00",
      description: "Annual physical exam and lab work",
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

'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: number
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  refetchUser: () => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
    }
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    refetchUser().finally(() => setIsLoading(false))
  }, [])

  return <UserContext.Provider value={{ user, isLoading, refetchUser, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

export interface User {
  id: string
  email: string
  name: string
  company?: string
  role: "admin" | "user"
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication - replace with your actual auth service
export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation - replace with actual authentication
    if (email === "demo@autonomousstudios.com" && password === "demo123") {
      const user: User = {
        id: "1",
        email: email,
        name: "Demo User",
        company: "Demo Company",
        role: "user",
      }

      // Store in localStorage for persistence
      localStorage.setItem("auth_user", JSON.stringify(user))

      // Set cookie for middleware
      document.cookie = `auth_user=${JSON.stringify(user)}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      return user
    }

    throw new Error("Invalid credentials")
  },

  async logout(): Promise<void> {
    localStorage.removeItem("auth_user")
    // Remove cookie
    document.cookie = "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem("auth_user")
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  },
}

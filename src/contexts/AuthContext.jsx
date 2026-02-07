import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('skynav_token'))

  // Use 127.0.0.1 instead of localhost to avoid IPv6 issues on some Windows setups
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('skynav_token')
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          })
          const data = await response.json()
          if (data.success) {
            setUser(data.user)
          } else {
            logout()
          }
        } catch (error) {
          console.error('Error fetching user:', error)
          logout()
        }
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      console.log(`Connecting to: ${API_URL}/auth/login`);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('skynav_token', data.token)
        localStorage.setItem('skynav_user', JSON.stringify(data.user))
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login Fetch Error:', error);
      return { success: false, error: 'Network error. Please try again later.' }
    }
  }

  const register = async (name, email, password) => {
    try {
      console.log(`Connecting to: ${API_URL}/auth/register`);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName: name, email, password })
      })

      const data = await response.json()

      if (data.success) {
        return { success: true, message: 'Registration successful! Please sign in.' }
      } else {
        return { success: false, error: data.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Register Fetch Error:', error);
      return { success: false, error: 'Network error. Please check if your backend is running at ' + API_URL }
    }
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('skynav_user', JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('skynav_token')
    localStorage.removeItem('skynav_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

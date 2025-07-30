import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for stored user data and token when the component mounts
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("googleToken")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    setToken(token)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("googleToken", token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("googleToken")
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


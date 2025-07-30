import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeModeContext = createContext()

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode")
    return savedMode || "light"
  })

  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  return <ThemeModeContext.Provider value={{ mode, toggleMode }}>{children}</ThemeModeContext.Provider>
}

export const useThemeMode = () => useContext(ThemeModeContext)


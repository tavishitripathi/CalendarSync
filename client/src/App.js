import React, { useEffect } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
impnejnort LandingPage from "./components/LandingPage"

const AppContent = () => {
  const { user, token } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    // Check token validity here if needed
    // If token is invalid, you can call logout()
  }, [token])

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: theme === "dark" ? "#121212" : "#f5f5f5",
            paper: theme === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: "blur(10px)",
                backgroundColor: theme === "dark" ? "rgba(30, 30, 30, 0.8)" : "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        },
      }),
    [theme],
  )

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {user && token ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <LandingPage />
      )}
    </MuiThemeProvider>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  )
}

export default App


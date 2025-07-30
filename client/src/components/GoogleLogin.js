import React from "react"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../context/AuthContext"
import { Box, Typography, Paper, Container } from "@mui/material"
import { CalendarToday } from "@mui/icons-material"

const GoogleSignIn = () => {
  const { login } = useAuth()

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    login(decoded, credentialResponse.credential)
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <CalendarToday sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="h4" component="h1" align="center">
            Welcome to Calendar App
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
            Sign in with your Google account to access your calendar events.
          </Typography>
          <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} useOneTap />
        </Paper>
      </Box>
    </Container>
  )
}

export default GoogleSignIn


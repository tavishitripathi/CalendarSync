import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material"
import { useAuth } from "../context/AuthContext"
import MenuIcon from "@mui/icons-material/Menu"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Calendar App
          </Typography>
          {user && (
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}
                alt={user.name}
                src={user.avatar}
              >
                {user.name[0]}
              </Avatar>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome, {user.name}
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                onClick={logout}
                sx={{
                  textTransform: "none",
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
        {/* Responsive Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handleMenuClose}>Welcome, {user?.name}</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Calendar App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

import React, { useState, useEffect } from "react"
import { Container, Typography, Box, CircularProgress, Grid, Paper, Tabs, Tab, IconButton } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import EventTable from "../components/Calendar/EventTable"
import EventSummary from "../components/Calendar/EventSummary"
import DateRangeFilter from "../components/Calendar/DateRangeFilter"
import CalendarView from "../components/Calendar/CalendarView"
import CreateEventDialog from "../components/Calendar/CreateEventDialog"
import TaskList from "../components/Calendar/TaskList"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import { loadEvents, saveEvents } from "../utils/eventStorage"

const Dashboard = () => {
  const { token } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState([null, null])
  const [view, setView] = useState("calendar")
  const [openCreateEvent, setOpenCreateEvent] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        let storedEvents = loadEvents()

        if (storedEvents.length === 0) {
          const response = await fetch("http://localhost:5000/api/calendar/events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              startDate: dateRange[0] ? dateRange[0].toISOString() : new Date().toISOString(),
              endDate: dateRange[1]
                ? dateRange[1].toISOString()
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            }),
          })

          if (!response.ok) throw new Error("Failed to fetch events")

          const data = await response.json()
          storedEvents = data
          saveEvents(data)
        }

        setEvents(storedEvents)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchEvents()
    }
  }, [token, dateRange])

  const updateEvents = (updatedEvents) => {
    setEvents(updatedEvents)
    saveEvents(updatedEvents)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Your Calendar Dashboard
          </Typography>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ p: 2, background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}
          >
            {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </motion.div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
              }}
            >
              <EventSummary events={events} onCreateEvent={() => setOpenCreateEvent(true)} />
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Tabs
                  value={view}
                  onChange={(_, newValue) => setView(newValue)}
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                    },
                    "& .MuiTab-root": {
                      color: "text.secondary",
                      "&.Mui-selected": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <Tab label="Calendar" value="calendar" />
                  <Tab label="List" value="list" />
                  <Tab label="Tasks" value="tasks" />
                </Tabs>
              </Box>
              <DateRangeFilter onDateRangeChange={setDateRange} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {view === "calendar" && <CalendarView events={events} updateEvents={updateEvents} />}
                  {view === "list" && <EventTable events={events} updateEvents={updateEvents} />}
                  {view === "tasks" && <TaskList events={events} updateEvents={updateEvents} />}
                </motion.div>
              </AnimatePresence>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      <CreateEventDialog
        open={openCreateEvent}
        onClose={() => setOpenCreateEvent(false)}
        onCreateEvent={(newEvent) => {
          const updatedEvents = [...events, newEvent]
          updateEvents(updatedEvents)
        }}
      />
    </Container>
  )
}

export default Dashboard


import React from "react"
import { Paper, Typography, Box, Grid, Button } from "@mui/material"
import { Event, Today, DateRange, Add } from "@mui/icons-material"
import { motion } from "framer-motion"

const EventSummary = ({ events, onCreateEvent }) => {
  const totalEvents = events.length
  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  }).length
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date)
    const today = new Date()
    return eventDate > today
  }).length

  const SummaryItem = ({ icon, title, count, color }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Box display="flex" alignItems="center" height="100%">
          {React.cloneElement(icon, { sx: { fontSize: 40, mr: 2, color } })}
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{count}</Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SummaryItem icon={<Event />} title="Total Events" count={totalEvents} color="primary.main" />
      </Grid>
      <Grid item xs={12}>
        <SummaryItem icon={<Today />} title="Today's Events" count={todayEvents} color="secondary.main" />
      </Grid>
      <Grid item xs={12}>
        <SummaryItem icon={<DateRange />} title="Upcoming Events" count={upcomingEvents} color="success.main" />
      </Grid>
      <Grid item xs={12}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" color="primary" startIcon={<Add />} fullWidth onClick={onCreateEvent}>
            Create New Event
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  )
}

export default EventSummary


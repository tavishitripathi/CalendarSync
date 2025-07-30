import React from "react"
import { Paper, Typography, Box } from "@mui/material"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { motion } from "framer-motion"

moment.locale("en-GB")
const localizer = momentLocalizer(moment)

const CalendarView = ({ events }) => {
  const calendarEvents = events.map((event) => ({
    title: event.summary,
    start: new Date(event.start.dateTime || event.start.date),
    end: new Date(event.end.dateTime || event.end.date),
    allDay: !event.start.dateTime,
  }))

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "rgba(25, 118, 210, 0.7)",
      borderRadius: "8px",
      opacity: 0.8,
      color: "white",
      border: "none",
      display: "block",
    }
    return {
      style,
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: 600,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Calendar View
        </Typography>
        <Box sx={{ height: "calc(100% - 40px)", overflow: "hidden", borderRadius: "8px" }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            views={["month", "week", "day"]}
            popup
            selectable
            eventPropGetter={eventStyleGetter}
            components={{
              event: (props) => (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Typography variant="body2" sx={{ p: 1 }}>
                    {props.title}
                  </Typography>
                </motion.div>
              ),
            }}
          />
        </Box>
      </Paper>
    </motion.div>
  )
}

export default CalendarView


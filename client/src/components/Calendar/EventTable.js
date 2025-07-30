import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material"
import { motion } from "framer-motion"
import { Edit, Delete, Event, Save, Cancel } from "@mui/icons-material"

const EventTable = ({ events, updateEvents }) => {
  const [editingEvent, setEditingEvent] = useState(null)

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
  }

  const handleSave = (updatedEvent) => {
    const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event))
    updateEvents(updatedEvents)
    setEditingEvent(null)
  }

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId)
    updateEvents(updatedEvents)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", borderRadius: "16px" }}
    >
      <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "primary.main" }}>
        Event List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody component={motion.tbody} variants={container} initial="hidden" animate="visible">
          {events.map((event) => (
            <motion.tr key={event.id} variants={item}>
              <TableCell>
                {editingEvent && editingEvent.id === event.id ? (
                  <TextField
                    value={editingEvent.summary}
                    onChange={(e) => setEditingEvent({ ...editingEvent, summary: e.target.value })}
                    fullWidth
                  />
                ) : (
                  <Chip
                    icon={<Event />}
                    label={event.summary}
                    color="primary"
                    variant="outlined"
                    sx={{ background: "rgba(255, 255, 255, 0.1)" }}
                  />
                )}
              </TableCell>
              <TableCell>{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {event.start.dateTime
                  ? `${new Date(event.start.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} - ${new Date(event.end.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "All day"}
              </TableCell>
              <TableCell>{event.description || "No description"}</TableCell>
              <TableCell>
                {editingEvent && editingEvent.id === event.id ? (
                  <>
                    <IconButton size="small" onClick={() => handleSave(editingEvent)}>
                      <Save />
                    </IconButton>
                    <IconButton size="small" onClick={() => setEditingEvent(null)}>
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(event)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(event.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventTable


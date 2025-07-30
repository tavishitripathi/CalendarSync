import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

const CreateEventDialog = ({ open, onClose, onCreateEvent }) => {
  const [eventTitle, setEventTitle] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    const newEvent = {
      summary: eventTitle,
      start: { dateTime: startDate.toISOString() },
      end: { dateTime: endDate.toISOString() },
      description: description,
    }
    onCreateEvent(newEvent)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} fullWidth />
          <DateTimePicker
            label="Start Date & Time"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DateTimePicker
            label="End Date & Time"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateEventDialog


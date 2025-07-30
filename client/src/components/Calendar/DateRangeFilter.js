import React from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Box, Button, TextField } from "@mui/material"
import { motion } from "framer-motion"

const DateRangeFilter = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  const handleApplyFilter = () => {
    onDateRangeChange([startDate, endDate])
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  )
}

export default DateRangeFilter


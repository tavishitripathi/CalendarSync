import React, { useState, useEffect, StrictMode } from "react"
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material"
import { Delete, Add, DragIndicator } from "@mui/icons-material"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { saveTasks, loadTasks } from "../../utils/taskStorage"

// This is a workaround for react-beautiful-dnd in React 18 Strict Mode
const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])
  if (!enabled) {
    return null
  }
  return <Droppable {...props}>{children}</Droppable>
}

const TaskList = ({ events }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = loadTasks()
    const eventTasks = events
      .filter((event) => event.description && event.description.toLowerCase().includes("task:"))
      .map((event, index) => ({
        id: `task-${event.id}`,
        text: event.description.replace(/task:/i, "").trim(),
        completed: false,
        order: index + savedTasks.length,
      }))
    return [...savedTasks, ...eventTasks].sort((a, b) => a.order - b.order)
  })
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskItem = {
        id: `task-${Date.now()}`,
        text: newTask,
        completed: false,
        order: tasks.length,
      }
      setTasks([...tasks, newTaskItem])
      saveTasks([...tasks, newTaskItem])
      setNewTask("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index,
    }))
    setTasks(reorderedTasks)
    saveTasks(reorderedTasks)
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedTasks = items.map((task, index) => ({
      ...task,
      order: index,
    }))

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  return (
    <StrictMode>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          background: "rgba(0, 0, 0, 0.34)",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Tasks
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                  startIcon={<Add />}
                  disabled={!newTask.trim()}
                >
                  Add
                </Button>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <List>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            mb: 1,
                            backgroundColor: snapshot.isDragging ? "primary.light" : "background.paper",
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: "divider",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                        >
                          <div
                            {...provided.dragHandleProps}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "8px",
                              cursor: "grab",
                              touchAction: "none", // Add this to improve touch interaction
                              userSelect: "none", // Add this to prevent text selection while dragging
                            }}
                          >
                            <DragIndicator color="action" />
                          </div>
                          <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            color="primary"
                          />
                          <ListItemText
                            primary={task.text}
                            sx={{
                              textDecoration: task.completed ? "line-through" : "none",
                              opacity: task.completed ? 0.7 : 1,
                              color: "text.primary",
                            }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteTask(task.id)}
                              sx={{
                                color: "error.main",
                                "&:hover": {
                                  backgroundColor: "error.light",
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Paper>
    </StrictMode>
  )
}

export default TaskList


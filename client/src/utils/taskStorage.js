export const saveTasks = (tasks) => {
    localStorage.setItem("calendarTasks", JSON.stringify(tasks))
  }
  
  export const loadTasks = () => {
    const savedTasks = localStorage.getItem("calendarTasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  }
  
  
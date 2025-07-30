export const saveEvents = (events) => {
    localStorage.setItem("calendarEvents", JSON.stringify(events))
  }
  
  export const loadEvents = () => {
    const storedEvents = localStorage.getItem("calendarEvents")
    return storedEvents ? JSON.parse(storedEvents) : []
  }
  
  
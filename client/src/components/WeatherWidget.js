import React, { useState, useEffect } from "react"
import { Box, Typography, CircularProgress } from "@mui/material"
import { WbSunny, Cloud, Opacity } from "@mui/icons-material"

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace with your actual weather API call
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YourAPIKey&units=metric",
        )
        if (!response.ok) {
          throw new Error("Weather data fetch failed")
        }
        const data = await response.json()
        if (!data || !data.weather || !data.main) {
          throw new Error("Invalid weather data format")
        }
        setWeather(data)
      } catch (error) {
        console.error("Error fetching weather:", error)
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return <CircularProgress size={20} />
  }

  if (!weather || !weather.weather || !weather.weather[0] || !weather.main) {
    return <Typography>Weather data unavailable</Typography>
  }

  const { main, weather: weatherConditions } = weather

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {weatherConditions[0].main === "Clear" && <WbSunny />}
      {weatherConditions[0].main === "Clouds" && <Cloud />}
      {weatherConditions[0].main === "Rain" && <Opacity />}
      <Typography>{Math.round(main.temp)}°C</Typography>
      <Typography>{weatherConditions[0].description}</Typography>
    </Box>
  )
}

export default WeatherWidget


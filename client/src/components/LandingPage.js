"use client"

import React, { useState, useRef } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useTheme,
  Tabs,
  Tab,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { 
  CalendarToday, 
  Schedule, 
  TrendingUp, 
  ArrowForward, 
  ExpandMore, 
  ArrowDownward 
} from "@mui/icons-material"

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    content: "This calendar app has revolutionized our team's productivity!",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Jane Smith",
    role: "Freelancer",
    content: "I can't imagine managing my schedule without this tool now.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Alex Johnson",
    role: "Project Manager",
    content: "The AI-powered suggestions have saved me hours every week.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

const pricingPlans = [
  {
    title: "Basic",
    price: "Rs 99",
    features: ["Google Calendar Sync", "Basic Analytics", "Email Support"],
  },
  {
    title: "Pro",
    price: "Rs 199",
    features: ["Advanced Analytics", "AI Suggestions", "Priority Support"],
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: ["Custom Integrations", "Dedicated Account Manager", "24/7 Support"],
  },
]

const faqs = [
  {
    question: "How does the Google Calendar integration work?",
    answer:
      "Our app seamlessly syncs with your Google Calendar, allowing you to view and manage all your events in one place. Any changes made in our app will be reflected in your Google Calendar and vice versa.",
  },
  {
    question: "What kind of AI-powered suggestions does the app provide?",
    answer:
      "Our AI analyzes your schedule patterns and provides suggestions for optimal meeting times, task scheduling, and breaks. It learns from your preferences over time to provide increasingly personalized recommendations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. We use industry-standard encryption protocols and never store your Google credentials. Your calendar data is only accessed when you're actively using the app.",
  },
]

const LandingPage = () => {
  const { login } = useAuth()
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const featuresRef = useRef(null)

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    login(decoded, credentialResponse.credential)
  }

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: "90vh", position: 'relative' }}>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h2" component="h1" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
                Transform Your Time Management
              </Typography>
              <Typography variant="h5" sx={{ color: "white", mb: 4 }}>
                Sync your Google Calendar and boost your productivity like never before
              </Typography>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
                useOneTap
                render={({ onClick }) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onClick}
                    endIcon={<ArrowForward />}
                  >
                    Get Started with Google
                  </Button>
                )}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  display: 'block', 
                  mt: 2 
                }}
              >
                Discover powerful features below
              </Typography>
            </motion.div>
          </Grid>

          {/* Scroll Down Indicator */}
          {activeTab === 0 && (
            <motion.div 
              style={{
                position: 'absolute', 
                bottom: theme.spacing(4), 
                left: '50%', 
                transform: 'translateX(-50%)',
                textAlign: 'center',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={scrollToFeatures}
              animate={{ 
                y: [0, 10, 0], 
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography variant="body2" sx={{ color: 'white' }}>Scroll Down</Typography>
              <ArrowDownward sx={{ color: 'white' }} />
            </motion.div>
          )}
        </Grid>
      </Container>

      {/* Feature Showcase */}
      <Container ref={featuresRef} maxWidth="lg">
        <Box my={8}>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: "white" }}>
            Powerful Features
          </Typography>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered sx={{ mb: 4 }}>
            <Tab label="Sync" sx={{ color: "white" }} />
            <Tab label="Manage" sx={{ color: "white" }} />
            <Tab label="Analyze" sx={{ color: "white" }} />
          </Tabs>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 0 && (
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ mr: 2, color: "primary.main", fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Seamless Google Calendar Integration
                        </Typography>
                        <Typography variant="body2" color="white">
                          Effortlessly sync and manage all your events in one place
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
              {activeTab === 1 && (
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center">
                      <Schedule sx={{ mr: 2, color: "primary.main", fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Smart Time Management
                        </Typography>
                        <Typography variant="body2" color="white">
                          AI-powered suggestions to optimize your schedule
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
              {activeTab === 2 && (
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center">
                      <TrendingUp sx={{ mr: 2, color: "primary.main", fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Productivity Analytics
                        </Typography>
                        <Typography variant="body2" color="white">
                          Gain insights into your time usage and improve efficiency
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Testimonials */}
        <Box my={8}>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: "white" }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1" paragraph>
                      "{testimonial.content}"
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing */}
        <Box my={8}>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: "white" }}>
            Choose Your Plan
          </Typography>
          <Grid container spacing={4}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {plan.price}
                    </Typography>
                    <Box mt={2}>
                      {plan.features.map((feature, featureIndex) => (
                        <Typography key={featureIndex} variant="body2" color="text.secondary" paragraph>
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Button variant="contained" color="primary" fullWidth>
                      Select Plan
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ */}
        <Box my={8}>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: "white" }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default LandingPage
const express = require('express')
const cors = require('cors')
const youtubeRoutes = require('./routes/youtube')
const tiktokRoutes = require('./routes/tiktok')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
console.log(process.env.PORT)

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/youtube', youtubeRoutes)
app.use('/api/tiktok', tiktokRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

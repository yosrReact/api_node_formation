const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")
const { createServer } = require("./utils/serverUtils")
// Load env vars
dotenv.config({ path: "./config/config.env" })

// Route files
const app = createServer()
const PORT = 5000

const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
  // Connect to database
  await connectDB()
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1));
})
module.exports = { app }

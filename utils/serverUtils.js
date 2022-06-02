const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const cors = require("cors")
const errorHandler = require("../middleware/error")

const auth = require("../routes/auth")
const users = require("../routes/users")
const contacts = require("../routes/contacts")
const tasks = require("../routes/tasks")
const createServer = () => {
  const app = express()
  // Body parser
  app.use(express.json())

  // Cookie parser
  app.use(cookieParser())

  // Dev logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
  }

  // Sanitize data
  app.use(mongoSanitize())

  // Enable CORS
  app.use(cors())

  // Mount routers
  app.use("/api/v1/auth", auth)
  app.use("/api/v1/users", users)
  app.use("/api/v1/contacts", contacts)
  app.use("/api/v1/tasks", tasks)

  app.use(errorHandler)
  return app
}
module.exports = { createServer }

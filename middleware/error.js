const errorHandler = (err, req, res, next) => {
  const error = { ...err }

  error.message = err.message

  // Log to console for dev
  console.log(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    res.status(400).json({
      success: false,
      errors: { other: message }
    })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const duplicatedInput = Object.keys(err.keyValue).reduce(
      (acc, cur) => ({ ...acc, [cur]: [cur] + ' input must be unique.' }),
      {}
    )
    res.status(400).json({
      success: false,
      errors: duplicatedInput
    })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).reduce(
      (acc, cur) => ({ ...acc, [cur.path]: cur.message }),
      {}
    )
    res.status(400).json({
      success: false,
      errors: message
    })
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler

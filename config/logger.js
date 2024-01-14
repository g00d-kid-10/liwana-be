const { createLogger, format, transports } = require('winston');

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

// Create a logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Set log level from environment variable
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Log to the console
    new transports.Console()
    // Optionally, log to a file
    // new transports.File({ filename: 'logs/app.log' }),
  ]
});

module.exports = logger;

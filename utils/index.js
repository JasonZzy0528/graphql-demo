import winston from 'winston'
import morgan from 'morgan'

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(
      {
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
        level: process.env.LOG_LEVEL,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false
      }
    )
  ]
})

morgan.token('body', (req) => {
  try {
    return JSON.stringify(req.body)
  } catch (err) {
    return '-'
  }
})

export {
  logger,
  morgan
}

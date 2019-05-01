import morgan from 'morgan'
import prettyjson from 'prettyjson'
import winston from 'winston'

const options = {
  keysColor: 'magenta',
  defaultIndentation: 2,
  numberColor: 'magenta',
  noColor: false
}

const logger = winston.createLogger({
  level: 'error',
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

logger.stream = {
  write: function(message) {
    logger.info(message)
  },
}

morgan.token('body', (req) => {
  try {
    return `\n${prettyjson.render(req.body, options, 6)}`
  } catch (err) {
    return '-'
  }
})

export {
  logger,
  morgan
}

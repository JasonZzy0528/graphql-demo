import { createServer } from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import history from 'connect-history-api-fallback'
import openBrowser from 'react-dev-utils/openBrowser'
import path from 'path'
import Promise from 'bluebird'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from './config'
import routes from './lib/routes'
import webpackDevConf from './config/webpack/webpack.conf.dev'
import { logger, morgan } from './utils'
import { wrapApolloServer, wrapSubscriptionServer } from './lib'

const { isClientEnabled, port } = config

const app: express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())
app.use(morgan(config.server.morganFormat, { stream: logger.stream }))

// webpack middleware
let devMiddleware
let compiler
if(process.env.NODE_ENV !== 'production' && isClientEnabled){
  compiler = webpack(webpackDevConf)
  devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackDevConf.output.publicPath,
    index: config.client.output,
    logger,
    noInfo: false,
    stats: {
      children: false,
      colors: true,
      modules: false
    }
  })

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))
}

app.use(routes)

if (isClientEnabled) {
  app.use(history())
  app.use(express.static(path.join(__dirname, 'dist')))
}

wrapApolloServer(app)

/**
 * Start application.
 * @returns {Promise}
 */
let startApplication = async () => {
  return new Promise(resolve => {
    if(devMiddleware){
      logger.info('Starting dev server...')
      devMiddleware.waitUntilValid(() => {
        app.listen(port)
        logger.info(`🚀 Application started, listening at on port ${port}`)
        openBrowser(`http://localhost:${port}`)
        resolve()
      })
    } else {
      // app.listen(port)
      const server = createServer(app)
      server.listen(port, () => {
        wrapSubscriptionServer(server)
      })
      logger.info(`🚀 Application started, listening at on port ${port}`)
      resolve()
    }
  })
}

// handle shutdown events -----------------------------------------------------

/**
 * Shutdown job queue.
 * @param {String} sig Signal
 */
let shutdown = (sig) => {
  logger.warn(`Received ${sig}, shutting down application`)
  process.exit(0)
}

process.on('SIGINT', function () {
  shutdown('SIGINT')
})
process.on('SIGTERM', function () {
  shutdown('SIGTERM')
})

// launch ---------------------------------------------------------------------

try {
  startApplication()
} catch (err) {
  logger.error(err)
  process.exit(1)
}

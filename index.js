import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import Promise from 'bluebird'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import opn from 'opn'

import config from './config'
import routes from './lib/routes'
import webpackConf from './config/webpack.conf'
import { logger, morgan } from './utils'
import serverWrapper from './lib'

const { port } = config

const app: express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(morgan(config.server.morganFormat))

// webpack middleware
let devMiddleware
let compiler
// if(process.env.NODE_ENV !== 'production'){
//   compiler = webpack(webpackConf)
//   devMiddleware = webpackDevMiddleware(compiler, {
//     publicPath: webpackConf.output.publicPath,
//     index: config.client.output,
//     logger,
//     noInfo: false,
//     stats: {
//       children: false,
//       colors: true,
//       modules: false
//     }
//   })
//
//   app.use(devMiddleware)
//   app.use(webpackHotMiddleware(compiler))
// }else{
//   app.use(express.static(path.join(__dirname, 'dist')))
// }

app.use(routes({compiler}))
serverWrapper(app)

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
        logger.info(`🚀Application started, listening at on port ${port}`)
        opn(`http://localhost:${port}`)
        resolve()
      })
    } else {
      app.listen(port)
      logger.info(`🚀Application started, listening at on port ${port}`)
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

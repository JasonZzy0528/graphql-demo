import express from 'express'
import path from 'path'

import config from '../../config'

let routes = (compiler) => {
  let router = express.Router()
  router.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  if (compiler) {
    router.get('*', function(request, response, next) {
      const filename = path.join(compiler.outputPath, 'index.html')
      compiler.outputFileSystem.readFile(filename, function(err, result) {
        if (err) {
          return next(err)
        }
        response.set('content-type', 'text/html')
        response.send(result)
        response.end()
      })
    })
  } else {
    router.get('*', (req, res) => {
      res.sendFile(path.resolve(config.client.output, 'index.html'))
    })
  }

  return router
}

export default routes

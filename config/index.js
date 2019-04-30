import path from 'path'
import fs from 'fs'

import getClientEnvironment from './env'

let env = getClientEnvironment
let morganFormat = ':date[web] - :method :url :status :response-time ms\n:body'
// :body'
const isDevMode = env().raw.NODE_ENV !== 'production'

const config = {
  client: {
    client: path.resolve(__dirname, '..', 'src'),
    devtool: isDevMode ? 'eval-source-map' : 'source-map',
    entry: {
      app: [
        '@babel/polyfill',
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '..', 'src', 'index.js')
      ]
    },
    icon: path.resolve(__dirname, '..', 'src', 'assets', 'icon.png'),
    output: path.resolve(__dirname, '..', 'dist'),
    template: path.resolve(__dirname, '..', 'src', 'index.html'),
    develop: {
      assetsPublicPath: path.resolve(__dirname, '..', 'src', 'assets'),
      autoOpenBrowser: true,
      errorOverlay: true,
      host: 'localhost',
      poll: false,
      port: 8888,
      proxy: {
        '/api': {
          changeOrigin: true,
          logLevel: 'debug',
          proxyTimeout: 60000,
          secure: false,
          target: process.env.API || 'https://localhost:3000/api'
        },
        '/subscriptions': {
          changeOrigin: true,
          logLevel: 'debug',
          proxyTimeout: 60000,
          secure: false,
          target: process.env.WS || 'https://localhost:3000/subscriptions',
          ws: true
        }
      }
    }
  },
  devMode: isDevMode,
  env: env,
  isClientEnabled: true,
  paths: {
    appNodeModules: path.relative(process.cwd(), 'node_modules'),
    appPackageJson: path.relative(process.cwd(), 'package.json')
  },
  port: 3000,
  server: {
    morganFormat
  },
  stylelintPath: path.resolve(__dirname, '../.stylelintrc'),
  useYarn: fs.existsSync(path.relative(process.cwd(), 'yarn.lock'))
}

export default config

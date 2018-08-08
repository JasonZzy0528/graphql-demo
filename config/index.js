import path from 'path'
import fs from 'fs'

import getClientEnvironment from './env'

let env = getClientEnvironment
let morganFormat = ':date[web] - :method :url :status :body - :response-time ms'

const config= {
  client: {
    client: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: path.resolve(__dirname, '..', 'src', 'index.js')
    },
    output: path.resolve(__dirname, '..', 'dist'),
    template: path.resolve(__dirname, '..', 'src', 'index.html')
  },
  env: env,
  paths: {
    appNodeModules: path.relative(process.cwd(), 'node_modules'),
    appPackageJson: path.relative(process.cwd(), 'package.json'),
  },
  port: 3000,
  server: {
    morganFormat
  },
  stylelintPath: path.resolve(__dirname, '../.stylelintrc'),
  useYarn: fs.existsSync(path.relative(process.cwd(), 'yarn.lock'))
}

export default config

import path from 'path'
import fs from 'fs'

import getClientEnvironment from './env'

let env = getClientEnvironment
let morganFormat = ':date[web] - :method :url :status :response-time ms :body'
const isDevMode = env().raw.NODE_ENV !== 'production'

const config= {
  client: {
    client: path.resolve(__dirname, '..', 'src'),
    devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map',
    entry: {
      app: path.resolve(__dirname, '..', 'src', 'index.js')
    },
    icon: path.resolve(__dirname, '..', 'src', 'assets', 'icon.png'),
    output: path.resolve(__dirname, '..', 'dist'),
    template: path.resolve(__dirname, '..', 'src', 'index.html')
  },
  devMode: isDevMode,
  env: env,
  isClientEnabled: false,
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

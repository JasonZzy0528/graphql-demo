import path from 'path'
import devEnv from './env/dev.env'
import prodEnv from './env/prod.env'
const NODE_ENV = process.env.NODE_ENV

let env
let morganFormat
if(NODE_ENV === 'production'){
  env = devEnv
}else{
  env = prodEnv
  morganFormat = ':date[web] - :method :url :status :body - :response-time ms'
}

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
  port: 3000,
  server: {
    morganFormat
  },
  stylelintPath: path.resolve(__dirname, '../.stylelintrc')
}

export default config

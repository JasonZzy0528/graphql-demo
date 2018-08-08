const NODE_ENV = process.env.NODE_ENV
import devWebpackConfig from './webpack/webpack.conf.dev'
// import prodWebpackConfig from './webpack/webpack.conf.prod'
let config

if(NODE_ENV == 'production'){
  // config = prodWebpackConfig
}else{
  config = devWebpackConfig
}

export default config

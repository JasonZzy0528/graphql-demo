// import path from 'path'
var path = require('path')

const env = {
  client: {
    entry: {
      app: path.resolve(__dirname, '..', '..', 'src', 'index.js')
    },
    output: path.resolve(__dirname, '..', '..', 'dist'),
    template: path.resolve(__dirname, '..', '..', 'src', 'index.html')
  },
  server: {

  },
  env: 'development',
  port: 8888
  // client: path.resolve(__dirname, '..', '..', 'src'),
  // entry: {
  //   app: path.resolve(__dirname, '..', '..', 'src', 'index.js')
  // },
  // env: 'development',
  // host: 'localhost',
  // output: path.resolve(__dirname, '..', '..', 'dist'),
  // port: 8888,
  // template: path.resolve(__dirname, '..', '..', 'src', 'index.html')
}

// export default config
module.exports = config

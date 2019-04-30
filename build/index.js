process.env.NODE_ENV = 'production'

import ora from 'ora'
import webpack from 'webpack'
import webpackConfig from '../config/webpack/webpack.conf.prod'

let spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})

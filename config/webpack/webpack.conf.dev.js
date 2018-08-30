import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'

import baseWebpackConfig from './webpack.conf.base'
import config from '../index'
import getClientEnvironment from '../env'

const publicUrl = ''
const env = getClientEnvironment(publicUrl)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.client.devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.client.template,
      inject: true,
      PUBLIC_URL: env.raw.PUBLIC_URL
    }),
    new webpack.NamedModulesPlugin()
  ]
})
export default devWebpackConfig

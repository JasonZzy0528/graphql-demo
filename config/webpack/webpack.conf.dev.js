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
  // devServer: {
  //   clientLogLevel: 'warning',
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   host: config.client.develop.host,
  //   port: config.client.develop.port,
  //   open: config.client.develop.autoOpenBrowser,
  //   overlay: config.client.develop.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.client.develop.assetsPublicPath,
  //   proxy: config.client.develop.proxy,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.client.develop.poll
  //   }
  // },
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

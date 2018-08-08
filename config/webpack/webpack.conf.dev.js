import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'
import { concat, forEach } from 'lodash'
import StyleLintPlugin from 'stylelint-webpack-plugin'

import getClientEnvironment from '../env'
import config from '../index'
import baseWebpackConfig from './webpack.conf.base'
const publicUrl = ''

const env = getClientEnvironment(publicUrl)

const entryNames = Object.keys(baseWebpackConfig.entry)
forEach(entryNames, name => {
  baseWebpackConfig.entry[name] = concat(['babel-polyfill', 'react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true'], baseWebpackConfig.entry[name])
})

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.client.template,
      inject: true,
      PUBLIC_URL: env.raw.PUBLIC_URL
    }),
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin({
      configFile: config.stylelintPath,
      syntax: 'scss'
    })
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  }
})
export default devWebpackConfig

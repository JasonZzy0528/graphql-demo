import path from 'path'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'
import { concat, forEach } from 'lodash'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'

import config from '../index'
import baseWebpackConfig from './webpack.conf.base'
const publicUrl = ''

const env = config.env(publicUrl)

const entryNames = Object.keys(baseWebpackConfig.entry)

forEach(entryNames, name => {
  baseWebpackConfig.entry[name] = concat(['babel-polyfill'], baseWebpackConfig.entry[name])
})

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.client.template,
      inject: true,
      PUBLIC_URL: env.raw.PUBLIC_URL
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      inject: true,
      // Short name is what appears on home screen
      short_name: 'My First PWA',
      // Name is what appears on splash screen
      name: 'My First Progressive Web App',
      // What appears on splash screen & home screen
      icons: [
        {
          src: config.client.icon,
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }
      ],
      // So your site can tell it was opened from home screen
      start_url: '/',
      // Match our app header background
      background_color: '#44ab98',
      // What the URL bar will look like
      theme_color: '#44ab98',
      // How the app will appear when it launches (see link below)
      display: 'standalone'
    }),
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin({
      configFile: config.stylelintPath,
      syntax: 'scss'
    }),
    new SWPrecacheWebpackPlugin(
      {
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        // minify: true,
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) {
            // This message occurs for every build and is a bit too noisy.
            return
          }
          if (message.indexOf('Skipping static resource') === 0) {
            // This message obscures real errors so we ignore it.
            // https://github.com/facebookincubator/create-react-app/issues/2612
            return
          }
        },
        navigateFallback: '/',
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
      }
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      // minSize: 30000,
      // maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all'
        }
      }
    }
  }
})

export default prodWebpackConfig

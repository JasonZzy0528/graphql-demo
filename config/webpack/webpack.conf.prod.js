import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import webpack from 'webpack'

import config from '../index'
import baseWebpackConfig from './webpack.conf.base'
const publicUrl = ''

const env = config.env(publicUrl)

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.client.devtool,
  plugins: [
    new CleanWebpackPlugin(
      [
        'dist'
      ],
      {
        root: path.resolve(__dirname, '..', '..'),
        exclude: [],
        verbose: true,
        dry: false
      }
    ),
    new webpack.DefinePlugin(env.stringified),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.client.template,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      PUBLIC_URL: env.raw.PUBLIC_URL
    }),
    new webpack.NamedModulesPlugin(),
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
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'async',
          reuseExistingChunk: true
        }
      }
    }
  }
})

export default prodWebpackConfig

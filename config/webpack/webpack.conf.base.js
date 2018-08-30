import config from '../index'
import eslintFormatter from 'react-dev-utils/eslintFormatter'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'

const { devMode } = config
const { client, entry, output } = config.client

const baseWebpackConfig = {
  entry,
  output: {
    chunkFilename: 'js/[id].[chunkhash].chunk.js',
    filename: 'js/[id].[hash].bundle.js',
    path: output,
    publicPath: '/',
    sourceMapFilename: 'source-map/[filebase].map'
  },
  resolve: {
    extensions: ['.json', '.js', 'scss'],
    alias: {
      actions: path.resolve(client, 'actions'),
      assets: path.resolve(client, 'assets'),
      epics: path.resolve(client, 'epics'),
      components: path.resolve(client, 'components'),
      containers: path.resolve(client, 'containers'),
      reducers: path.resolve(client, 'reducers'),
      store: path.resolve(client, 'store'),
      styles: path.resolve(client, 'styles'),
      types: path.resolve(client, 'types')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: eslintFormatter
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //     importLoaders: 1
          //   }
          // },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|icon|eot|svg|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [
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
    new StyleLintPlugin({
      configFile: config.stylelintPath,
      syntax: 'scss'
    })
  ]
}

export default baseWebpackConfig

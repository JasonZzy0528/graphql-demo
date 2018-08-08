import path from 'path'
import config from '../index'
import eslintFormatter from 'react-dev-utils/eslintFormatter'

const { client, entry, output } = config.client

const baseWebpackConfig = {
  entry,
  output: {
    path: output,
    publicPath: '/',
    filename: 'js/[id].[hash].bundle.js',
    sourceMapFilename: 'source-map/[file].map',
    chunkFilename: 'js/[chunkhash].chunk.js'
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
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //     importLoaders: 2
          //   }
          // },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
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
        use: 'url-loader?limit=100000'
      }
    ]
  }
}

export default baseWebpackConfig

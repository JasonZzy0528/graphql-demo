import ManifestPlugin from 'webpack-manifest-plugin'
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

// new ManifestPlugin({
//   fileName: 'asset-manifest.json',
// }),
// new SWPrecacheWebpackPlugin(
//   {
//     // dontCacheBustUrlsMatching: /\.\w{8}\./,
//     filename: 'service-worker.js',
//     // minify: true,
//     logger(message) {
//       console.error(message)
//       if (message.indexOf('Total precache size is') === 0) {
//         // This message occurs for every build and is a bit too noisy.
//         return
//       }
//       if (message.indexOf('Skipping static resource') === 0) {
//         // This message obscures real errors so we ignore it.
//         // https://github.com/facebookincubator/create-react-app/issues/2612
//         return
//       }
//     },
//     navigateFallback: 'http://localhost:3000/index.html',
//     navigateFallbackWhitelist: [/^(?!\/__).*/],
//     // staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
//   }
// ),
//     new MiniCssExtractPlugin({
// Options similar to the same options in webpackOptions.output
// both options are optional
//   filename: 'css/[name].css',
//   chunkFilename: 'css/[id].css'
// }),
//
// optimization: {
//   namedModules: true,
//   noEmitOnErrors: true,
// splitChunks: {
//   chunks: 'async',
//   minSize: 30000,
//   maxSize: 250000,
//   minChunks: 1,
//   maxAsyncRequests: 5,
//   maxInitialRequests: 3,
//   name: true,
//   cacheGroups: {
//     commons: {
//       test: /[\\/]node_modules[\\/]/,
//       name: 'vendors',
//       chunks: 'all'
//     }
//   }
// }
// }

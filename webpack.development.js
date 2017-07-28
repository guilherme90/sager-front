/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { resolve } = require('path')

module.exports = (webpack, config) => {
  config.devtool = 'extract-text-webpack-plugin?cheap-module-source-map'
  config.devServer = {
    contentBase: resolve(__dirname, 'public'),
    port: config.__PORT__,
    inline: true,
    hot: true,
    compress: true,
    open: true,
    stats: 'errors-only'
  }
  config.entry.push(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './index.js'
  )
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )

  return config
}
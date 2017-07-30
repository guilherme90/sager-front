/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const config = require('./webpack.config')

module.exports = (webpack, config, babelSettings) => {
  config.entry.bundle.push('./index.js')
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      parallel: {
        cache: true,
      },
      comments: false
    })
  )

  babelSettings.plugins.push('transform-react-inline-elements')
  babelSettings.plugins.push('transform-react-constant-elements')

  return config
}
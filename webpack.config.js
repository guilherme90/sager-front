/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { resolve, join } = require('path')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babelSettings = JSON.parse(fs.readFileSync('.babelrc'))

if (!process.env.NODE_ENV) {
  console.error('Oopz! Variable "NODE_ENV" not found!')

  return false
}

if (!process.env.API_URL) {
  console.error('Oopz! Variable "API_URL" not found!')

  return false
}

const __SRC__ = resolve(__dirname, 'src')
const __PRODUCTION__ = process.env.NODE_ENV === 'production'
const __DEV__ = !__PRODUCTION__
const __API_URL__ = process.env.API_URL
const __PORT__ = process.env.PORT || 8080

const config = {
  context: __SRC__,
  cache: true,
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __SRC__,
      'node_modules'
    ]
  },
  entry: {
    react: [
      'react',
      'react-dom',
      'react-redux',
      'react-addons-css-transition-group',
      'react-addons-transition-group',
      'prop-types',
      'react-router'
    ],
    vendor: [
      'react-bootstrap',
      'react-bootstrap-typeahead',
      'react-router-bootstrap',
      'react-document-title',
      'react-fontawesome',
      'react-loader',
      'sweetalert2'
    ],
    bundle: []
  },
  output: {
    path: resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bundle', 'vendor', 'react'],
      filename: '[name].min.js',
      minChunks: Infinity,
      allChunks: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PORT: JSON.stringify(__PORT__),
      API_URL: JSON.stringify(__API_URL__)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: join(__dirname, 'src')
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
        use: 'file-loader'
      }
    ]
  }
}

if (__DEV__) {
  module.exports = require('./webpack.development')(webpack, config)
}

if (__PRODUCTION__) {
  module.exports = require('./webpack.production')(webpack, config, babelSettings)
}
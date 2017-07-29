/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const express = require('express')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)
const app = express()
const __PORT__ = process.env.PORT

if (process.env.NODE_ENV === 'development') {
  const opn = require('opn')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }))

  app.use(webpackHotMiddleware(compiler, {
    reload: true
  }))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'))
}

app.use((err, request, response, next) => {
  response.status(err.status || 500)

  response.render('error', {
    message: err.message,
    error: {}
  })
})

app.get('*', (request, response) => {
  response.sendFile(
    path.resolve(
      __dirname, 
      'public', 
      'index.html'
    )
  )
})

app.listen(__PORT__, (err) => {
  if (err){
		return console.log(err)
	}

  console.log(`Listening on port ${ __PORT__}!`)

  
})
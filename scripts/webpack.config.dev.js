const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV =='development'
const devServer = require('./webpack-dev-server')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    // 'webpack-hot-middleware/client?noInfo=true&reload=true',
    path.join(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css',
      '.less',
      '.png',
      '.jpg',
      'json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({ summary: false }),
    new HtmlWebpackPlugin({
      title: 'wui',
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inject: true
    })
  ]
}

console.log(process.env.NODE_ENV, '----------');
if (!isDev) {
  devConfig.devServer = devServer.devServer
}

console.log(devConfig);
module.exports = devConfig

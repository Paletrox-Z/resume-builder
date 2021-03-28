const path = require('path')
const webpack = require('webpack')
const webpackDevConfig = require('./webpack.commonConfig')

const ROOT_DIR = path.resolve(__dirname, '../')

webpackDevConfig.plugins.push(...[new webpack.HotModuleReplacementPlugin()])

webpackDevConfig['devServer'] = {
  historyApiFallback: true,
  contentBase: path.resolve(ROOT_DIR, './dist'),
  open: false,
  compress: true,
  disableHostCheck: true,
  hot: true,
  port: 80,
}

webpackDevConfig['mode'] = 'development'

webpackDevConfig['devtool'] = 'source-map'

module.exports = webpackDevConfig

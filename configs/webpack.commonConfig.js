const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = path.resolve(__dirname, '../')

const webpackCommonConfig = {
  entry: {
    main: path.resolve(ROOT_DIR, './src/index.js'),
  },
  output: {
    path: path.resolve(ROOT_DIR, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    // configuration options
    // Support import without extension
    extensions: ['.js', '.jsx'],
    // Set folder alias for easy imports
    alias: {
      configs: path.resolve(`${ROOT_DIR}/configs`),
      src: path.resolve(`${ROOT_DIR}/src`),
    },
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIR, './src/index.html'), // template file
      filename: 'index.html', // output file
    }),
  ],
}

module.exports = webpackCommonConfig

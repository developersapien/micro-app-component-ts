const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  devServer: {
    host: 'localhost',
    hot: true,
    port: 3001,
    open: true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: './index.html',
      template: './src/index.html',
      title: 'Development',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dev'),
    }),
  ],
}

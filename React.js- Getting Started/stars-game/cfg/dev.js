var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/dev-server',
    'bootstrap-loader',
    './app/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, '..', 'node_modules')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: [
          path.resolve(__dirname, '..', 'bower_components')
        ],
        loaders: [
          'style',
          'css',
          'postcss',
          'sass'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: [
          path.resolve(__dirname, '..', 'node_modules/bootstrap-sass')
        ],
        loader: "url-loader?limit=1024&name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        exclude: [
          path.resolve(__dirname, '..', 'app/assets/images')
        ],
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '..', 'build')
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'build'),
    port: 8000,
    host: 'localhost',
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '..', 'app/favicon.ico'), to: path.join(__dirname, '..', 'build/favicon.ico') }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

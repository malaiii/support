const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [
            require('@babel/plugin-proposal-function-bind'),
            require('@babel/plugin-proposal-class-properties')
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|otf|ttf|eot|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    //publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:8131',
        secure: false
      }
    },
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    //publicPath: 'http://localhost:3000/dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'US Retail Portal',
      template: './public/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin(
      [{ from: 'public/data', to: 'data' },
      { from: 'public/images', to: 'images' },
      { from: 'public/fonts', to: 'fonts' },
      { from: 'public/styles', to: 'styles' },
      { from: 'public/data' },
      ], { options: {} }
    )
  ]
};

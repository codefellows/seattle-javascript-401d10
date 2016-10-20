'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new HTMLPlugin({
    template: `${__dirname}/app/index.html`,
  }),
  new ExtractTextPlugin('bundle.css'),
];

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  devtool: 'eval',
  plugins,
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/scss/lib`],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
      },
      {
        test: /\.(woff|ttf|svg|eot).*/,
        loader: 'url?limit=10000&name=font/[hash].[ext]',
      },
    ],
  },
};

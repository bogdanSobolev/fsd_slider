// testing.webpack.js
'use strict';

// Depends
const path = require('path');
const webpack = require('webpack');

module.exports = function(_path) {
  return {
    cache: true,
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules']
    },
    module: {
      preLoaders: [
        {
          test: /.spec\.[jt]s$/,
          include: /src/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
        {
          test: /\.[jt]s?$/,
          include: /src/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
      ],
      loaders: [
        // es6 loader
        {
          include: path.join(_path, 'app'),
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
      ],
    },
  };
};
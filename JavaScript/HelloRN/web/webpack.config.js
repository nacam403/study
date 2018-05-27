const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['react-native']
    }
  }
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist')
  },

  module: {
    rules: [
      babelLoaderConfiguration,
    ]
  },

  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },

}

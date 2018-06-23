const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-calendars'),
    path.resolve(appDirectory, 'node_modules/react-native-gifted-chat'),
    path.resolve(appDirectory, 'node_modules/@expo'),
    path.resolve(appDirectory, 'node_modules/react-native-lightbox'),
    path.resolve(appDirectory, 'node_modules/react-native-invertible-scroll-view'),
    path.resolve(appDirectory, 'node_modules/react-native-scrollable-mixin'),
    path.resolve(appDirectory, 'node_modules/react-clone-referenced-element'),
    path.resolve(appDirectory, 'node_modules/react-native-parsed-text'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['react-native']
    }
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist')
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
    ]
  },

  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: [
      '.android.js',
      '.web.js',
      '.js',
    ],
  },

}

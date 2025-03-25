const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: 'main.js',
  },
  target: 'electron-main',
};



//module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
//  entry: './src/main.js',
  // Put your normal webpack config below here
//  module: {
//    rules: require('./webpack.rules'),
//  },
//};

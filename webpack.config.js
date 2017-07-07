const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'whatwg-fetch',
    __dirname + '/src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/static/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
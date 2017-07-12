const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    __dirname + '/src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/dist"
  },
  plugins: [],
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
    contentBase: ".",
    port: 9000
  }
};
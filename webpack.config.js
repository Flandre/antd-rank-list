module.exports = {
  entry: __dirname + '/src/main',
  output: {
    path: __dirname + '/static/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
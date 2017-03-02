let webpack = require("webpack");
let path = require('path');

module.exports = {
  name: 'client',
  target: 'node',
  entry: {
    app: "./scripts/app.js"
  },
  output: {
    path: './build',
    filename: "app.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: [/node_modules/, /app\/scripts\/lib\/*/]
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      debug: 'debug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
};

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import cssnano from 'cssnano'

const defaultConfig = {
  stats: {
    assets: true,
    cached: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    timings: true,
    version: false,
    warnings: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      debug: 'debug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc'
        }
      }
    }),
    new WebpackNotifierPlugin()
  ],
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js']
  }
}

const serverConfig = Object.assign({}, defaultConfig, {
  name: 'server',
  target: 'node',
  entry: {
    app: "./server/app.js"
  },
  output: {
    path: './build',
    filename: "server.js"
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
});

var clientConfig = Object.assign({}, defaultConfig, {
  name: 'public',
  entry: {
    app: "./client/scripts/index.js"
  },
  output: {
    path: './build/public',
    filename: "app.js"
  },
  module: {
    rules: defaultConfig.module.rules.concat({
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader?importLoaders=3",
          "postcss-loader",
          "sass-loader?sourceMap"
        ],
      })
    })
  },
  plugins: defaultConfig.plugins.concat([
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      path: 'public',
      filename: 'index.html',
      inject: true,
      cache: true
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc'
        },
        postcss: {
          plugins: [
            cssnano({
              autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions']
              },
              discardComments: {
                removeAll: true
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true,
              sourcemap: true
            })
          ]
        }
      }
    })
  ]),
});

module.exports = [serverConfig, clientConfig]

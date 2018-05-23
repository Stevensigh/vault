/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

dotenv.config();

// Array of known environment variables whose value may be injected into the frontend as a key in
// process.env, allowing Node-like environment variable access in client-side logic.
const BUILD_ENV_VARS = [
  'NODE_ENV',
  'FOOTER_TEXT',
  'SENTRY_CLIENT_DSN',
];

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src/client',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /src\/client\/.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': BUILD_ENV_VARS
        .filter((key) => key in process.env)
        .reduce((acc, key) => ({
          ...acc,
          [key]: JSON.stringify(process.env[key]),
        }), {}),
    }),
    new HTMLWebpackPlugin({
      template: 'src/client/resources/templates/index.html',
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
  },
};

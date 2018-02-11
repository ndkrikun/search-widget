const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');


module.exports = {
  entry: {
    polyfills: [
      './app/src/polyfills.ts',
    ],
    application: [
      './app/src/application.tsx',
      './app/src/application.sass',
    ]
  },

  output: {
    path: __dirname + '/app/dist',
    publicPath: '/dist/',
    filename: '[name].js',
  },

  watch: true,

  devtool: 'source-map',

  module: {
    loaders: [

      { test: /\.html$/, loader: 'raw-loader' },

      { test: /\.ts$/, loader: 'awesome-typescript-loader' },

      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        }),
      },

    ],
    noParse: /\.DS_Store/
  },

  resolve: {
    extensions: ['.html', '.ts', '.tsx', '.js'],
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    new ExtractTextPlugin('application.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};

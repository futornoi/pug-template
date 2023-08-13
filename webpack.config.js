const { resolve } = require('path')
const {
  PugLoader,
  FontsLoader,
  ImageLoader,
  SassLoader,
  BabelLoader,
} = require('./webpack/loaders')
const { ImageMinimizer, PugPagesPlugin, CssPlugin, CleanPlugin } = require('./webpack/plugins')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  devtool: 'source-map',
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
  },
  devServer: {
    port: 3000,
    hot: false,
    liveReload: true,
  },
  plugins: [CssPlugin(), CleanPlugin(), ...PugPagesPlugin()],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [ImageMinimizer()],
  },
  module: {
    rules: [ImageLoader, FontsLoader, PugLoader, BabelLoader, SassLoader],
  },
}

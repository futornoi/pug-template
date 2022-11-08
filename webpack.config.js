const CssPlugin = require('./webpack/CssPlugin')
const CopyPlugin = require('./webpack/CopyPlugin')
const PugPagesPlugin = require('./webpack/HtmlPlugin')
const LiveReloadPlugin = require('./webpack/LiveReloadPlugin')
const BabelLoader = require('./webpack/BabelLoader')
const SassLoader = require('./webpack/SassLoader')
const ImageMinimizer = require('./webpack/ImageMinimizer')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  devtool: 'source-map',
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  devServer: {
    port: 3000,
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    clean: true,
  },
  plugins: [CssPlugin(), CopyPlugin(), LiveReloadPlugin(), ...PugPagesPlugin()],
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
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      BabelLoader,
      SassLoader,
    ],
  },
}

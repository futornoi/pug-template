const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = glob.sync(path.resolve(__dirname, '../../src/pug/pages') + '/*.pug')

module.exports = () =>
  pages.map(file => {
    const base = path.basename(file, '.pug')

    return new HtmlWebpackPlugin({
      inject: true,
      filename: './' + base + '.html',
      template: './src/pug/pages/' + base + '.pug',
    })
  })

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                browsers: 'last 2 versions',
              },
            ],
          ],
        },
      },
    },
    'sass-loader',
  ],
}

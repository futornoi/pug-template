module.exports = {
  test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/images/[hash][ext][query]',
  },
}

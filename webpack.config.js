const HtmlWebpackPlugin = require('html-webpack-plugin')
const globby = require('globby');
const path = require('path');

const paths = globby.sync(['./src/pages/*.js'])
const entry = {}
const plugins = []
paths.map(p => {
  const name = path.basename(p).split('.').slice(0, -1)[0]
  entry[name] = p
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [name]
    })
  )
})

module.exports = {
  entry: entry,
  mode: 'production',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
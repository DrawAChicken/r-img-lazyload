const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'r-img-lazyload.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'react-dom/server': {
        root: 'ReactDOMServer',
        commonjs2: 'react-dom/server',
        commonjs: 'react-dom/server',
        amd: 'react-dom/server'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    }
  ],
}

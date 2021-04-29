// Webpack config for building - separate to that in vue.config.js which is for testapp
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
// Set app 'root' to testapp for 'vue-cli-service serve'
module.exports = {
    externals: [nodeExternals()],
    // Disable performance/asset size warnings due to using non-minified etc modules
    performance: { hints: false },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.vue$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'css-loader',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'sld.js',
      library: {
        root: 'sld',
      },
      libraryTarget: 'umd',
    },
    plugins: [
      new VueLoaderPlugin()
    ],
}

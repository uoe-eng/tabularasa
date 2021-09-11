const path = require('path')
// Set app 'root' to testapp for 'vue-cli-service serve'
module.exports = {
  // gh-pages sets mode = production to use subdir in url
  publicPath: process.env.NODE_ENV === 'production' ? '/tabularasa/' : '',
  configureWebpack: {
    // Disable performance/asset size warnings due to using non-minified etc modules
    performance: { hints: false },
    context: path.resolve(__dirname + '/testapp'),
  },
}

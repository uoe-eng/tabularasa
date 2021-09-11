const path = require('path')
// Set app 'root' to testapp for 'vue-cli-service serve'
module.exports = {
  // use subdir in url if building for gh-pages
  publicPath: process.env.NODE_ENV === 'gh-pages' ? '/tabularasa/' : '',
  configureWebpack: {
    // Disable performance/asset size warnings due to using non-minified etc modules
    performance: { hints: false },
    context: path.resolve(__dirname + '/testapp'),
  },
}

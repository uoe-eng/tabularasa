module.exports = {
  configureWebpack: {
    // Don't follow symlinks - breaks 'yarn link'
    resolve: { symlinks: false }
  }
}

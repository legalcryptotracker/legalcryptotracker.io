module.exports = {
  chainWebpack: function (config) {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/styles.scss";'
      }
    }
  },
}

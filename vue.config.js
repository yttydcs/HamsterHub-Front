const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack');
module.exports = defineConfig({
  devServer: {
    port: 3000
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true)
      })
    ]
  },
})

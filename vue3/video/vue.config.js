const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  productionSourceMap: false,
  css: {
    extract: false,
  },
  configureWebpack: {
    output: { filename: "app.js" },
    optimization: {
      splitChunks: false,
    },
  },
})

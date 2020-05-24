module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // transpileOnly: true, /* コンパイルのみで型検査を行わない */
                appendTsSuffixTo: [/\.vue$/] /* .vueファイルをTSとして読み込むようにする */
              }
            }
          ]
        },
      ]
    }
  }
}
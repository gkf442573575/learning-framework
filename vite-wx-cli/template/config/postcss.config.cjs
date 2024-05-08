module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 37.5, // 换算的基数
      selectorBlackList: ['ig'],
      propList: ['*'],
      exclude: /node_modules/
    })
  ]
}

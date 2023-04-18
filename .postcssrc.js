module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性
      // *表示所有属性
      propList: ['*'],
      // 排除不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}

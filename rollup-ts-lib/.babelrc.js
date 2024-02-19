module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: 'auto',
        loose: true
      }
    ]
  ]
}

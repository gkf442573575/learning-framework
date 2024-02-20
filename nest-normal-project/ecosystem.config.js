// const NEST_APP_NAME = 'NEST_APP';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./app.config.js');

module.exports = {
  apps: [
    {
      name: appConfig.NEST_APP_NAME,
      exec_mode: 'cluster',
      instances: 1, // 开启几个进程
      script: './dist/main.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ...appConfig,
      },
    },
  ],
};

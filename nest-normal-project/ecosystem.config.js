const NEST_APP_NAME = 'NEST_APP';

module.exports = {
  apps: [
    {
      name: NEST_APP_NAME,
      exec_mode: 'cluster',
      instances: 1,
      script: './dist/index.js',
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NEST_APP_NAME,
        NEST_APP_PORT: 12138,
        NEST_APP_DATABASE: JSON.stringify({
          "type": "mysql",
          "host": "127.0.0.1",
          "port": 3306,
          "username": "root",
          "password": "G124578",
          "database": "nest_test_database",
          "connectTimeout": 200000,
          "synchronize": true, 
          "logging": false,
          "entities": ["dist/**/*.entity{.ts,.js}"]
        }),
        NEST_APP_JWT_SECRET: 'nest-app-jwt-secret',
      }
    },
  ],
};

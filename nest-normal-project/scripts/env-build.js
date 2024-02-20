/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');

const envBuild = () => {
  const appDir = fs.realpathSync(process.cwd());

  const envPath = path.join(appDir, '.env');

  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  const data = `module.exports = ${JSON.stringify(envConfig, null, 2)}`;

  // 生成app.config.js
  fs.writeFileSync(path.join(appDir, `app.config.js`), data, 'utf-8');
};

envBuild();

/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path');
const { writeFileSync } = require('fs');

const { config } = require('dotenv');

const envBuild = () => {
  const root_path = process.cwd();

  const env_config = config({
    path: [resolve(root_path, '.env.production'), resolve(root_path, '.env')],
  });

  console.log('env_config >>>', env_config.parsed);
  if (env_config.parsed) {
    const data = `module.exports = ${JSON.stringify(env_config, null, 2)}`;
    writeFileSync(join(root_path, `app.config.js`), data, 'utf-8');
  }
};

envBuild();

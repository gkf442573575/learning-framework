const fs = require('fs-extra')
const path = require('path')
const runner = require('child_process')

const ora = require('ora')
const chalk = require('chalk')
const validateName = require('validate-npm-package-name')

const prompts = require('prompts')

const spinner = ora()

const templateRoot = path.resolve(__dirname, '../template')

const packageJson = require('../package.json')

const createReame = (app) => {
  const readMe = `# ${app}

### Setup
<b>配置.env .env.development .env.production环境变量</b>


### Development
\`\`\`sh
  npm run dev
\`\`\`

### Production
\`\`\`sh
  npm run build
\`\`\`

### Docs
<b>[Vue3.0](https://cn.vuejs.org/)</b>

<b>[Vite](https://cn.vitejs.dev/)</b>

<b>[Pinia](https://pinia.vuejs.org/)</b>

<b>[VueRouter](https://router.vuejs.org/zh/)</b>

<b>[Wx JS-Sdk](https://developer.work.weixin.qq.com/document/10029)</b>

<b>[Vant](https://vant-ui.github.io/vant/#/zh-CN/)</b>

<b>[Element Plus](https://element-plus.gitee.io/zh-CN/)</b>
`
  return readMe
}

const createProject = async (app) => {
  spinner.start('📦 App Setup...')
  try {
    // 升级到最新版本的
    runner.execSync(`npm i ${packageJson.name}@latest -g --registry=${packageJson.publishConfig.registry}`)
    // 创建app
    runner.execSync(
      `npm create vue@latest ${app} -- --default false --ts false --jsx --router --pinia --tests false --vitest false --cypress false --nightwatch false --playwright false --eslint --eslint-with-prettier`
    )

    const appDir = path.resolve(process.cwd(), app)

    // 复制index html
    fs.copyFileSync(path.join(templateRoot, 'html/index.html'), path.join(appDir, 'index.html'))

    // 复制src的内容
    const appSrc = path.join(appDir, 'src')
    fs.removeSync(appSrc)
    fs.mkdirSync(appSrc)
    fs.copySync(path.join(templateRoot, 'src'), appSrc)

    // 重写readme
    fs.writeFileSync(path.join(appDir, 'README.md'), createReame(app))

    // 复制env
    fs.copySync(path.join(templateRoot, 'env'), appDir)
    // 复制config
    fs.copySync(path.join(templateRoot, 'config'), appDir)

    // 复制wx sdk
    const libDir = path.join(appDir, 'public/lib')
    fs.mkdirSync(libDir)
    fs.copySync(path.join(templateRoot, 'lib'), libDir)

    // 升级依赖
    runner.execSync('npm i', {
      cwd: appDir
    })
    runner.execSync(
      'npm i qs amfe-flexible axios class-validator vant element-plus @element-plus/icons-vue --save',
      {
        cwd: appDir
      }
    )
    runner.execSync(
      'npm i scss scss-loader autoprefixer postcss postcss-loader postcss-pxtorem --save-dev',
      {
        cwd: appDir
      }
    )

    spinner.stop()
    // 完成
    console.log(chalk.green(`🚀  Success! Created ${app} project complete!`))

    console.log(
      chalk.yellow(`
    Now run:
        cd ${app}
        npm run dev    
      `)
    )
  } catch (error) {
    spinner.stop()
    process.exit()
  }
}

// 初始化文件名
const init = async (app) => {
  // 验证名
  const result = validateName(app)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${app}"`))
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim('Error: ' + err))
      })
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim('Warning: ' + warn))
      })
    process.exit()
  }
  // 文件夹
  const appDir = path.resolve(process.cwd(), app)
  if (fs.existsSync(appDir)) {
    const { action } = await prompts([
      {
        name: 'action',
        type: 'select',
        message: `Target directory "${app}" is not empty`,
        choices: [
          { title: 'Overwrite', value: 'overwrite' },
          { title: 'Cancel', value: 'cancel' }
        ]
      }
    ])
    if (action === 'cancel') {
      return process.exit()
    } else if (action === 'overwrite') {
      spinner.start(`🧹 Clearing ${app}`)
      fs.removeSync(appDir)
      spinner.stop()
      createProject(app)
    }
  } else {
    createProject(app)
  }
}

module.exports = init

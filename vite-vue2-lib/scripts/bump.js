import { execSync } from 'node:child_process'
import chalk from 'chalk'

const bump = () => {
  try {
    const pkg_tag = process.env.PKG_TAG || ''

    const script = `bumpp && npm run build && npm publish${pkg_tag ? `--tag ${pkg_tag}` : ''}`

    execSync(script, { cwd: process.cwd(), stdio: 'inherit' })

    console.log(chalk.green(`\nBump Success`))
    process.exit()
  } catch (error) {
    process.exit()
  }
}

bump()

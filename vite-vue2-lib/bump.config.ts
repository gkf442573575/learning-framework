import { defineConfig } from 'bumpp'

export default defineConfig({
  files: ['package.json'],
  customVersion(currentVersion, semver) {
    const name = process.env.PKG_TAG || ''
    const list = currentVersion.split('-')
    const version = list[0]
    const nextVersion = name
      ? semver.inc(version, 'prepatch', name, false)
      : semver.inc(version, 'patch', false)
    return nextVersion || currentVersion
  }
})

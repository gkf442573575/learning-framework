import type { RollupOptions } from 'rollup'

import typescript from '@rollup/plugin-typescript'
import resovle from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

import { babel } from '@rollup/plugin-babel'

import dayjs from 'dayjs'

// 用require是为了在cjs模式的config下可运行
const dts = require('rollup-plugin-dts')

import pkg from './package.json' assert { type: 'json' }

import path from 'path'

// FIXME: 请修改此参数，写自己插件名称
const PKG_NAME = 'RollupLib' || pkg.name

const banner = `/**
 * @package ${PKG_NAME}
 * @copyright (c) 2023 ${pkg.author}
 * @license ${pkg.license}
 * @author ${pkg.author}
 * @date ${dayjs().format('YYYY-MM-DD')}
 * @version ${pkg.version}
 */`

// 是否是生产环境
const isProd = process.env.NODE_ENV === 'production'

const config: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: [
      {
        name: PKG_NAME,
        file: pkg.main,
        format: 'umd',
        banner
      },
      {
        file: pkg.module,
        format: 'es',
        banner
      }
    ],
    external: ['dayjs'],
    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(__dirname, 'src')
          }
        ]
      }),
      resovle(),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      isProd && terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: { file: pkg.types, format: 'es' },
    plugins: [dts.default()]
  }
]

export default config

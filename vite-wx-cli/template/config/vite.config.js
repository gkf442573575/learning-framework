import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_APP_BASH_PATH,
    server: {
      host: true,
      open: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            axios: ['axios'],
            elementUI: ['element-plus'],
            vant: ['vant'],
            vendor: ['class-validator', 'qs'],
            vueVendor: ['pinia', 'vue-router']
          }
        }
      },
      chunkSizeWarningLimit: 1024,
      assetsDir: 'static'
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { envParse } from 'vite-plugin-env-parse'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_PATH,
    plugins: [react(), envParse()],
    build: {
      assetsDir: 'sources',
      chunkSizeWarningLimit: 3072,
      rollupOptions: {
        output: {
          manualChunks: {
            'reactVendor': ['react', 'react-dom']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
})

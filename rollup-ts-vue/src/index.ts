import type { App, Plugin } from 'vue'

import LibButton from './index.vue'

const LibButtonPlugin: Plugin = {
  install(app: App) {
    app.component(LibButton.name ||　'LibButton', LibButton)
  }
}

export type LibButtonInstance = InstanceType<typeof LibButton>

export default LibButtonPlugin


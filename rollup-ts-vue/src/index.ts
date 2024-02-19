import type { App, Plugin } from 'vue'

import Component from './index.vue'

const ComponentPlugin: Plugin = {
  install(app: App) {
    app.component(Component.name, Component)
  }
}

export default ComponentPlugin

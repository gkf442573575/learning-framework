import PortalTest from './index.vue'

import './index.scss'

const components = [PortalTest]

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  PortalTest
}

<template>
  <el-button @click="onClick">{{ title }}</el-button>
</template>

<script lang="js">
import { Button } from 'element-ui';

export default {
  name: 'PortalTest',
  components : {
    [Button.name]: Button
  },
  props: {
    title: {
      type: String,
      default: 'Portal Test'
    }
  },
  methods: {
    onClick() {
      console.log('clicked')
      this.$emit('success', this.title)
    }
  }
}
</script>


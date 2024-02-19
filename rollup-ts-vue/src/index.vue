<template>
  <div class="test-btn">{{ title }}</div>
  <el-button type="primary" @click="fomateDate">测试</el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

import dayjs from 'dayjs';

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const fomateDate = () => {
  console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
}

defineOptions({
  name: 'lib-button'
})
</script>

<style lang="less">
.test-btn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: cadetblue;
  color: #fff;
  cursor: pointer;
  border-radius: 15px;
}
</style>

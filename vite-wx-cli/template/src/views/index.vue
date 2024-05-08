<template>
  <el-button type="primary" :icon="Share" @click="shareMsg">分享</el-button>
  <el-button plain :icon="Memo" @click="openConcat">通讯录</el-button>
  <el-button type="success" :icon="Promotion" @click="getLocation">获取位置</el-button>
</template>

<script setup>
import { Share, Memo, Promotion } from '@element-plus/icons-vue'
import { invokeWxApi, commonWxApi, agentWxApi } from '@/utils/wx'

const shareMsg = async () => {
  try {
    const res = await invokeWxApi('shareAppMessage', {
      title: '测试标题',
      desc: '测试分享的简介',
      link: location.href
    })

    console.log('share res >>>', res)
  } catch (error) {
    console.log('share err >>>', error)
  }
}

const openConcat = async () => {
  try {
    const res = await agentWxApi('selectEnterpriseContact', {
      fromDepartmentId: 0,
      mode: 'multi',
      type: ['department', 'user']
    })
    console.log('openConcat res >>>', res)
  } catch (error) {
    console.log('openConcat err >>>', error)
  }
}

const getLocation = async () => {
  try {
    await commonWxApi('getLocation', {
      type: 'wgs84',
      success: function (res) {
        console.log('getLocation res >>>', res)
      }
    })
  } catch (error) {
    console.log('getLocation err >>>', error)
  }
}
</script>

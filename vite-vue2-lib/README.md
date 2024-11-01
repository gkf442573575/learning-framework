# @dgov/portal-test


### Install

```bash
npm install @dgov/portal-test@latest --save --registry=http://10.110.1.216:4873
```

### Use

.vue

```js
import PortalTest from '@dgov/portal-test'
import '@dgov/portal-test/dist/style.css'

export default {
  components: {
    PortalTest
  }
}
```
main.js
```js
import Vue from 'vue'

import PortalTest from '@dgov/portal-test'
import '@dgov/portal-test/dist/style.css'

Vue.use(PortalTest)
```


### Props
| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | String | Portal Test | The title |

### Events
| Event | Params |Description |
| ---- | ---- | ------- |
| success | title | 成功事件 |

### Slots
| Slot | Description |
| ---- | ------- |
| default | 默认插槽 |


### Project SetUp

```bash
npm install
```

### Development

```bash
npm run dev

npm link

# 到项目路径下
npm link @dgov/portal-test
```

### Publish

推送包到npm, 推送前要将当前代码在git全部提交完成

```bash
npm run bump
```

### Publish TAG

推送包带tag的版本，用于区分不同版本tag时
需在package.json在scripts中的bump配置中增加tag

```json
// package.json 比如发布 qingdao的tag
{
  //...
  "scripts": {
    //...
    "bump": "cross-env PKG_TAG=qingdao node scripts/bump.js"
  }
  //...
}

```
### Install Tag
安装指定tag的包

```bash
# qingdao
npm install @dgov/portal-test@qingdao --save --registry=http://10.110.1.216:4873

```
或者再package.json中配置
```json
{
  //...
    "@dgov/portal-test": "qingdao"
  //...
}

```
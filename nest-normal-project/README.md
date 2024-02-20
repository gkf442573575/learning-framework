# nest-normal-project

## Setup

```bash
npm install
```

## Running

```bash
npm run dev
```

## Build

```bash
# # install ncc
# npm i -g @vercel/ncc 不使用ncc部分功能不行

npm run build
```

## Server

1. <b>Build Zip</b>

```bash
npm run build:prod
```
2. <b>Unzip In Server</b>

```bash
unzip nest-normal-project.zip -d nest-normal-project
```
3. <b>PM2</b>

```bash
# install pm2
npm i -g pm2

# In nest-normal-project
cd nest-normal-project
# Install
npm install
# Start
pm2 start
```

## Support

[Nest](https://github.com/nestjs/nest)

[PM2](https://pm2.fenxianglu.cn/)

<!-- [Ncc](https://github.com/vercel/ncc#readme) -->

## Material Icon

<b>.vscode/setting.json</b>

```json
{
    "material-icon-theme.activeIconPack": "nest"
}
```


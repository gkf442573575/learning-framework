# 服务器自签ssl证书

## 1. 修改配置
将 server.conf及v3.ext的中的ip换成服务器ip

## 2. 生成证书
```bash
sh ./ssl.sh
```

## 3. 配置nginx

```bash
# 查看有无ssl的模块 出现 --with-http_ssl_module 及则说明已安装，无请查询如何nginx 重新编译安装ssl模块
nginx -V
```

将ssl.conf copy到nginx的conf目录，或者配置到nginx.conf中，修改证书路径

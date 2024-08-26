# 生成根证书私钥
openssl genrsa -out ca.key 2048

# 根据私钥生成根证书 
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -config root.conf

# 生成私钥
openssl genrsa -out server.key 2048

# 根据私钥生成根证书 
openssl req -new -days 3650 -key server.key -out server.csr -config server.conf

# 使用自己的签名机构进行自签名
openssl x509 -days 3650 -req -sha256 -extfile v3.ext -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
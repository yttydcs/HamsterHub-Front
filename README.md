# HamsterHub-Front

Hamster Hub网盘的后端程序  
开发中......

## TODO

### 基础功能

- [ ] **文件操作**
    - [x] **上传**
        - [x] **秒传**
    - [x] **下载**
    - [x] **删除**
    - [x] **查看**
    - [x] **复制**
    - [x] **移动**
    - [ ] **迁移**
    - [x] **重命名**
    - [x] **覆盖**
    - [ ] **分享**
        - [x] **新增**
            - [x] **公开**
            - [x] **需要密码**
        - [ ] **删除**
            - [x] **手动删除**
            - [x] **定时删除**
            - [ ] **限定访问次数**
        - [ ] **修改**
            - [ ] **修改限制时间**
            - [ ] **修改限制次数**
        - [x] **下载**
    - [ ] **历史版本**
        - [ ] **查看老版本文件内容**
        - [ ] **文件版本回滚**
- [ ] **目录操作**
    - [x] **创建**
    - [x] **删除**
    - [x] **查看**
    - [ ] **复制**
    - [x] **移动**
    - [ ] **迁移**
    - [x] **重命名**
- [x] **存储设备**
- [x] **存储策略**
    - [ ] **聚合存储策略**
        - [ ] **存储优先级**
            - [x] **剩余空间大小**
            - [ ] **手动**
    - [ ] **备份策略**
        - [ ] **定时备份**
- [x] **统一API返回格式**
- [x] **用户系统**
- [x] **权限组系统**
- [ ] **任务系统**
- [x] **Redis缓存**
- [ ] **暂存区**

### 设备适配

- [x] **本地磁盘**
- [x] **阿里云**
- [ ] **OneDrive**
- [ ] **Samba**
- [ ] **WebDAV**

### 拓展功能

- [ ] **公共空间**
- [ ] **流量管控**
- [ ] **WebDAV**
- [ ] **离线下载**
- [ ] **RSS订阅**


# 安装 Project setup
```
yarn install
```

## 开发环境运行 Compiles and hot-reloads for development
```
yarn run serve
```

## 打包 Compiles and minifies for production
```
yarn build
```

## 格式化 Lints and fixes files
```
yarn run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

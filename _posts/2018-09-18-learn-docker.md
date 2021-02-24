---
layout: post
title: 学习 Docker 笔记
subtitle: "Learn Docker"
author: "Toma"
header-style: text
hidden: true
tags:
  - 笔记
  - web
  - docker
---

> Docker 相关


## 常用命令

使用`docker ps`命令列举出所有运行中的Docker容器，该命令参数比较多，-a列表所有的容器，-f过滤，-q只列表容器的id。

使用`docker stop $CONTAINER_ID`来终止一个运行中的容器。并且可以使用`docker ps -a`来看终止状态的容器。

`docker restart 容器ID或容器名` ：不管容器是否启动，直接重启容器

`docker rm $(docker ps -a -q)` 删除所有的容器（只删除单个时把后面的变量改为image id即可）

删除指定id的镜像 `docker rmi <image id>`, 删除全部 `docker rmi $(docker images -q)` 当要删除的iamges和其他的镜像有关联而无法删除时, 可通过 -f 参数强制删除

`docker build -t 标签名称 目录`，构建Docker镜像，-t表示指定一个标签。docker tag 为镜像打标签。更多的命令可以使用docker --help 查看，如果想查询docker run命令的用法，可以使用docker run --help进行查看。


## 安装

阿里云安装 docker

```sh
# 确保 yum 包更新到最新。
yum update

# 卸载旧版本
yum remove docker  docker-common docker-selinux docker-engine

# 安装需要的软件包
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 设置yum源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 可以查看所有仓库中所有docker版本
yum list docker-ce --showduplicates | sort -r

# 安装docker
yum install docker-ce

# 启动并加入开机启动
sudo systemctl start docker
sudo systemctl enable docker

# 安装docker-compose
# 1 安装epel源
yum install -y epel-release

# 2 安装docker-compose
yum install -y docker-compose 
```

测试
```sh
# 查找
docker search nginx

# 安装
docker pull nginx:latest

# 查看本地
docker images

# 运行
docker run --name nginx-test -p 8080:80 -d nginx

```

- --name nginx-test：容器名称。
- -p 8080:80： 端口进行映射，将本地 8080 端口映射到容器内部的 80 端口。
- -d nginx： 设置容器在在后台一直运行


## 注意

🙃 努力中...


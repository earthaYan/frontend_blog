# docker 安装

以 centos8 为例

## 前置要求

centos 内核版本至少高于 3.10，可以通过`uname -r`查看

如果低于 3.10 则用`yum update`进行升级

## 安装 docker

1. 安装依赖

`yum install -y yum-utils device-mapper-persistent-data lvm2`

2. 添加阿里云仓库

`yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`

最终被添加到 /etc/yum.repos.d 文件夹下

3. 安装 docker 本身

`yum -y install docker-ce`

4. 启动 docker 并验证

```bash
systemctl start docker
docker -v
```

5. 将 docker 添加到开机自动启动

`systemctl enable docker`

6. 配置镜像加速器

[镜像加速列表](https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6)
[参考资料](https://www.wangdu.site/course/2109.html)

```bash
# 创建 docker 配置文件`/etc/docker/daemon.json`
vi /etc/docker/daemon.json
# 编辑json文件
#/etc /docker/daemon.json
{
  "registry-mirrors": ["https://docker.wanpeng.top"]
}
# 重启docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 安装 docker-compose

1. 下载 docker-compose 二进制文件

   `curl -SL https://ghp.ci/https://github.com/docker/compose/releases/download/v2.29.6/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose -o /usr/local/bin/docker-compose`

[github 加速](https://ghp.ci/)

2. 修改权限

   `chmod +x /usr/local/bin/docker-compose`

3. 验证

`docker-compose -v`

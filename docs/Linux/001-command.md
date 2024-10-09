# 常用命令

## 查看 Linux 的所有用户信息

命令：`cat /etc/passwd`

结果展示

> username:password:UID:GID:user-info:home-dir:shell<br/>
> 用户名:密码占位符:UID:GID:用户描述:用户主目录:登录 Shell

UID 为 0 表示当前用户为管理员.具有最高权限

## 添加用户和用户组

```
useradd going # 创建 going 用户
passwd going # 设置密码
sed -i '/^root.*ALL=(ALL).*ALL/a\going\tALL=(ALL) \tALL' /etc/sudoers  # 添加sudo权限
```

添加 sudo 详解：

1. `-i`表示直接在源文件上修改
2. `/^root.*ALL=(ALL).*ALL/'`匹配以 root 开头并且包含 ALL=(ALL) 和 ALL 字段的行
3. `a\going\tALL=(ALL) \tALL`在匹配到的行后添加新行，`\t`为 tab 字符用于对齐，`ALL=(ALL) ALL`表示该用户可以用 sudo 执行所有命令，权限和 root 类似

## 修改 yum 源

```
mv /etc/yum.repos.d /etc/yum.repos.d.bak # 先备份原有的 Yum 源
mkdir /etc/yum.repos.d
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
yum clean all && yum makecache  # 清理原来的yum并重新创建缓存
```

## 别名

作用：用于为常用的命令创建简短替代名称的功能
命令：`alias cp='cp -i'`

## 查看 Linux 架构信息

查看系统的核心信息：`uname -a/-m`

Linux hcss-ecs-f13a 4.18.0-348.7.1.el8_5.x86_64 #1 SMP Wed Dec 22 13:25:12 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux

单项查看：lscpu
![架构信息](./imgs/info.png)

## 查看版本

涉及变量：$releasever

查看系统版本：cat /etc/redhat-release

使用：自动根据系统的版本号动态替换该变量

## curl 下载文件

```
curl 下载地址

-X, --request <command>
  指定要使用的 HTTP 请求方法（如 GET、POST、PUT 等）。默认是 GET。

-d, --data <data>
  发送数据，通常与 POST 请求一起使用。可以是表单数据或 JSON 数据。

-H, --header <header>
  自定义 HTTP 请求头。可以用来添加认证信息、内容类型等。

-o, --output <file>
  将输出写入指定文件，而不是输出到标准输出。

-L, --location
  跟随服务器的重定向（HTTP 301、302 等）。这很有用，因为某些下载链接可能会重定向到另一个 URL。

-S, --show-error
  在出现错误时显示错误信息。这对调试很有帮助。

-v, --verbose
  显示详细的请求和响应信息，包括头信息。这有助于调试和查看请求过程。

-k, --insecure
  忽略 SSL 证书错误。使用此选项时，curl 将不会验证 HTTPS 连接的证书（不推荐在生产环境中使用）。

-u, --user <user:password>
  使用基本认证（Basic Authentication）。格式为 username:password。

-I, --head
  只请求 HTTP 响应头，而不请求具体的内容。

-s, --silent
  静默模式，不输出进度信息和错误信息，通常与 -S 一起使用以仅显示错误信息。

--compressed
  向服务器请求压缩的响应（如 gzip），以减少传输数据的大小。
```

## TODO

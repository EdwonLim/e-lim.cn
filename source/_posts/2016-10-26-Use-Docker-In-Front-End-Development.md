title: Docker 在前端开发中的应用 —— 快速部署统一开发环境
date: 2016-10-26
category: 潮流技术
tags: [Docker]
thumbnailImage: https://ws1.sinaimg.cn/large/006cGJIjly1fizampp49qj308k04tdgg.jpg
thumbnailImagePosition: left
---

Docker 刚发布时，定位是一个单机的轻量化虚拟化工具，只被部分运维人员知晓。但伴随着 Docker 大生态的发展，Google 、微软、亚马逊等大厂的加入，Docker 逐渐为开发所知。<!-- more -->

Docker 的意义在于：**Build once， run anything in anywhere at anytime** （笔者仿造 RN 的口号脑补的）。Docker 很像一个打包工具，将你的应用打包，迁移并运行在各种平台、各种环境上，降低了应用对环境的依赖，从最底层降低了开发成本。如此接地气的技术，**将来应该是每个开发者必须掌握的一项技能**，业界都惊呼 Docker 是下一个 Hadoop。

此篇文章要探讨一下 Docker 在前端技术中的应用。有人说，Docker 是服务端技术，和前端没有任何关系。如果你指的是纯粹的前端，纯粹的 HTML + JS + CSS 的话，真的没有什么关系；但是在广义的大前端环境下，你的前端项目要依赖各式各样的打包工具或者你要用 Node 开发一个后端工程，那么关系就很大了。 这里笔者，主要结合前端开发环境上遇到的问题，来探讨 Docker 的应用。

![各大厂商的支持](https://img.ptcms.csdn.net/article/201506/23/5588fb74cab55_middle.jpg)

### 前端开发环境遇到的问题

作为一个前端工程师，当你拿到一个新电脑时，你可能要安装：Node、NVM、NPM、YARN、CNPM、Gulp、Webpack、Browserify、Bower、Sass、Less、Coffee、Babel、React-Native-Cli 甚至还有 pm2、forever 等等。再加上如果你是一个 Windows 用户，那么『天将降大任』就来了。更别说为了兼容多个项目，你要装 Node 4.x 的同时，装 NPM 3.x；也不要提，在大局域网里，被『墙』逼得要死。随着前端的发展，开发环境越来越复杂，这种种问题都会时常遇到，而且这些问题不是所有人都可以很快解决的，尤其对于刚入行的新人。

总结一下上面的阐述，可以抽象为三个主要问题：

1. 依赖的环境很多，本地搭建一套环境成本越来越高，初级人员很难解决环境部署的一些问题。
2. 环境的版本差异（常见的 Node 版本）及 OS 的差异（例如 Node Sass 依赖 OS）都可能导致线上环境的 BUG 或故障。
3. 项目的环境大变动时，所有人的环境要重新部署。

对于，一些大厂，会提供给开发人员一些开发机，来保证环境的一致性。 不过，这样做会投入一些开发环境的机器或者虚机，提高了公司的成本；同时，采用开发机的形式，需要把本地的代码同步到开发机，每改动一次代码，都要同步一次，如果网络不畅通或者工程很大，那么会大幅增加时间成本，并且在非公司内网环境，此种方案是无法采用的。

本地如何解决呢？有人说虚拟机就可以解决。对于前两个问题，利用虚拟机是可以解决的，而第三个问题，由于虚拟机的镜像并没有版本概念，同时也没有一个种统一的云端管理方式，以至于，当多人同时操作一个镜像时，很容易出现冲突或遗漏，传输起来也很困难。

而  Docker 作为轻量级虚拟化工具，在提供了仓库和版本的逻辑的同时，体积也比一般的虚拟机镜像小得多，并且支持『秒启』，所以 Docker 几乎可以完美的解决上述三个问题。

![Docker VS VMs](https://img.blog.csdn.net/20140306094828703)

既然解决了问题，那么下面要了解下怎么办。

### 如何使用 Docker

假设一个场景，有这样一个 JS 脚本文件 (index.js)，我期望他每个开发者用 Node 执行后可以输出同样的内容。

```javascript
console.log([process.platform, process.version].join('-'));
```

代码大家一看就明白，输出相同的内容，需要每个开发者有『相同平台、相同 Node』版本的『开发环境』。

#### Docker 环境

安装 Docker，基本上是傻瓜式安装，可以从 Docker 官网上下载安装包或者国内 DaoCloud 的官网上下载，安装过程并没有什么坑。此时，在你的 Bash 里就存在了 `docker` 命令。

#### 构建一个镜像

首先，你要有一个 Dockerfile，示例如下:

```
FROM daocloud.io/library/centos
MAINTAINER edwon lim <adwon.lin@qunar.com>

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash \
    && source /root/.bash_profile \
    && nvm install v4.4.4
```

然后在这个文件所在的目录执行 `docker build --tag node_environment .`，从而构建出一个名为 `node_environment` 的镜像。

代码很好理解，其实就是在一个 centos 的镜像上，安装 nvm 和 4.4.4 版本的 node，从而生成一个新的镜像。

#### 如何运行

```
docker run -v ./:/root/workspace node_environment /bin/bash -c "source ~/.bash_profile; cd /root/workspace; node index.js"
```

这句命令也很好理解，就是把当前目录挂在到容器（由镜像创建的运行环境，可以理解为虚拟机）的 `/root/workspace` 下，然后在虚拟环境下执行 `node index.js`，这样输出的结果将一直是 `Linux-v4.4.4`。

这里有人会说，执行的命令太长，那么你可以用 `alias good_node="docker run -v $(pwd):/root/workspace node_environment /bin/bash -c "source ~/.bash_profile; cd /root/workspace; node $1"`，这样以后只需要执行 `good_node index.js` 即可。

#### 共享给其他人

把镜像共享给他人，才能让所有人都持有统一套环境。常见的有两种方式：

1. 将 Dockerfile push 到版本仓库中，其他人更新并本地 build
2. 将镜像 push 到 docker 仓库中，其他人通过 docker pull 更新镜像

这节主要简单就一个小案例介绍了一下 Docker 的使用方式。结合实际考虑，项目构建工具，尤其是带有代码编译构建逻辑的，这种方式，**是否能安全有效地避免环境差异造成的一些问题，同时解决多个开发者配置一样的环境所造成的时间、精力成本？** 笔者认为答案是肯定的，而且可以做到 **开发过程中使用的环境和发布时使用的环境完全一致**。

前文简单介绍了一下 Docker，大家大概理解了 Docker 是什么，但是具体怎么使用，还需要很长的路要走。为了，让大家快速上手，将一些常见的使用方式封装成 Dokit 的方式进行使用。

### 接地气的 Dokit

Dokit 可以帮助开发者快速部署基于Docker的一体化前端开发环境，介绍文档地址为 <https://ued.qunar.com/dokit/>。

Dokit 主要提供了两个功能命令：

1. `dokit`: 初始化创建容器，并进入容器，之后每次直接快速进入容器。
2. `dokit run 你的命令`: 快速执行命令

![dokit run](https://ww1.sinaimg.cn/large/71c50075gw1f8oii9eenxj20mf08040j.jpg)

Dokit 的实现原理很简单，就是封装了 docker 命令和一些经常使用的逻辑，使对 Docker 不是熟悉的用户可以很快上手，三分钟部署好前端环境。

PS：这里感谢我司 OPS 搭建了内网 docker 源，才实现三分钟搭建前端环境的这个艰巨任务（主要是内网下载镜像快）。当然如果你把镜像放到国内最快的源 DaoCloud 上，其实也不会很慢，半小时内肯定能搞定。

### 写在最后

Docker 是当前最火爆的技术之一，而且是很有发展的，笔者建议作为任意方向的开发者都应该学习一下。当然，它也存在一些不完善的地方，但是瑕不掩瑜，Docker 真可以帮我们真正实现环境统一和快速部署，何乐而不为呢？

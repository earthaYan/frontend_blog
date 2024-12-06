---
outline: [1, 2]
---

# 项目相关

## 自我介绍

### 要点：

重点放在需要关注的点上，弱化个人信息和工作信息，至少包含**成功经验**（案例 or 数据）、**个人优势**（性格 or 技术）、**匹配度高**（工作职责）、**意愿度强**、**求职动机**

### 语言组织：

我叫 xx，2017 年实习开始一直从事前端开发工作。前公司主要是做数据库产品，从前端角度可以描述为数据库智能运维管理平台，期间参与了 DMP 和 DTLE 等项目的开发，主要使用 react 和 ant 相关技术栈;上上家公司主要做房地产行业相关产品，期间参与了 PMS PC 端和 House730 H5 端等项目的开发，主要使用 vue 相关技术栈。

## 项目介绍

Dtle 项目是从 0 开始搭建的，独立完成，其余项目均作为普通前端开发进行

### DMP

数据库集群管理平台,主要功能包括：MySQL、Redis 等多种数据库的部署；数据库的高可用、监控告警、巡检与诊断等。从前端角度来说是将数据库运维操作进行可视化，提高 DBA 的工作效率。主要使用 react 开发

### DTS

数据传输软件，主要功能分为数据服务(迁移/同步/订阅)和平台管理(用户管理/权限配置) 2 大部分。数据服务部分用户可以通过按钮创建、暂停、重启对应服务，可查看该任务详情。主要使用 react 开发

### PMS

房源管理系统，主要功能包括：首页，业务管理，楼盘管理，金币管理，消息管理等。主要使用 vue2 +element-ui 开发

### house730

类似于贝壳找房，主要功能包含：首页，房源列表，房源详情，个人中心，地图找房，楼市成交，地产新闻等。主要使用 vue2 + vant 开发

## 私有组件库封装

### 背景

公司很多前端项目，希望这些前端项目的风格能保持一致。有很多公共组件，但这些组件散落在各个项目中，比如要在 A 项目中使用 B 项目的某个公共组件，就需要复制粘贴代码到 B 项目，后期如果需要修改某个公共组件，就必须到所有项目里修改。最终决定将其抽离成一个第三方库，使用 npm 方式引入

### 方案

使用 verdaccio 搭建私有组件库

### 步骤

1. 搭建 nodejs,pnpm
2. 安装 verdaccio
3. 修改配置文件

```yaml
web:
  title: Verdaccio
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 1
uplinks:
  taobao:
    url: https://registry.npmmirror.com/
    cache: true
    timeout: 3000
  npmjs:
    url: https://registry.npmjs.org/
    cache: true
    timeout: 6000
  local:
    url: http://127.0.0.1:4873/
packages:
  "@*/*":
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao npmjs local
  "**":
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao npmjs local
listen: 0.0.0.0:4873
```

### 遇到的问题

#### css 页面样式冲突

1. 最外层增加父级选择器，比如 `ui-[组件名称]-[组件子组件]-wrapper`
2. 使用 CSS Modules，每个组件的样式都会被自动作用域化，生成独特的类名

#### 依赖问题

问题：组件库会依赖其他外部库或工具，如果组件库和宿主项目使用了不同版本的这些依赖，会导致兼容性问题或版本冲突
解决方案： package.json 文件指定`peerDependencies`,指定组件库所需要的外部依赖的版本范围。若不符合则会出现告警，让组件库使用者去决定降级主项目的 依赖版本或者提醒库开发者更新组件库以支持主项目的依赖版本

## 静态资源在浏览器加载过程以及页面性能优化点

公司部分项目历史过于悠久且逻辑复杂，页面加载时间过长，前端通过按需加载某些大型依赖项和删除未使用的依赖项来减小最终打包产物的大小；切割大体积文件，减少初始加载时间和资源占用；整合小体积文件，减少发送请求开销
:::tip

- CDN:静态资源一般从 CDN 获取，若加载速度很慢则去找 CDN 负责人确认问题
- 解析静态资源：删除冗余资源，合并文件减少请求数量，使用 webp 类似的高效图片格式
- vue 程序初始化：
  - 异步加载：使用懒加载和代码分割，将应用代码按需加载，只在用户访问相关页面时才加载需要的模块
  - 延迟初始化：对于一些不需要立刻显示的部分内容，可以通过延迟加载或者将其放到用户交互之后再加载，减轻初始化时的资源负担
- 渲染过程：
  - 懒加载：直到用户滚动到这些资源所在的位置时才加载它们，减少初始渲染时的负担
  - 雪碧图：将多个小图标或图片合并为一个大图，减少 HTTP 请求数量

:::

## 团队工作流程

## 如果接口有变更，前端如何及时发现并处理

1. api 版本化
2. 前后端沟通
3. 维护一个变更日志

## 独立负责的项目的搭建(脚手架，package.json 等)

使用 create-react-app 脚手架搭建了项目，技术栈主要包括 react，react-router,redux toolkit，antd 等。

项目代码结构大致如下：src/api,src/components,src/hooks,src/page,src/router,src/store

## 如何封装 axios

请求拦截器添加 token，响应拦截器添加对 200 和 4xx,3xx，5xx 等异常处理

## token 使用过程中突然失效

### 切入点：

### 解决方案

方案 1：直接跳到登陆页面

方案 2：token 无感刷新,利用登录接口返回的 accessToken 和 refreshToken，使用响应拦截器拦截 401 报错，请求 refreshToken 接口，请求头包含之前获取到的 refreshToken,最终获取到最新的 accessToken

## 调用接口数据如何保证安全性

使用 token，每次请求的时候在请求拦截器中设置一个 Authorization 字段

## 私有库封装中遇到的问题

## 图表优化

折线图数据量大，点多，但需要显示全图，如何优化避免卡顿？

1. 数据压缩和简化：对数据进行抽样，
2. 虚拟化渲染
3. 分段加载数据

## 开发自测

1. 测试会在需求交付结束之后出一份用例评审
2. 开发利用该用例依次去测试对应的功能
3. 前端单元测试

## 项目难点

### DTLE:

背景：公司项目分为 2 个版本，通用版本和客户定制版本，但他们的代码是同一个仓库。客户用 dtle 去做信创相关工作时，需要将 dtle 全部替换为 dts，并且隐藏掉 logo

难点：在不影响公司通用版本的情况下实现该功能

解决方案：mutation observer 用于监听 DOM 树中元素变化 + 条件编译插件

```js
let sourceStr = "dtle",
  targetStr = "DTS";
let sourceReg = /dtle/gi,
  targetNode = document.body;
document.title = "DTS";
const config = {
  characterData: true, //监控文本节点内容的变化
  childList: true, //监控子节点的添加或删除。
  subtree: true, //监控整个子树（包括嵌套的子节点）
  attributes: true, //监控元素属性的变化。
};
const isIncludesSource = (target) => {
  return typeof target === "string"
    ? target.toLowerCase().includes(sourceStr)
    : false;
};
const replaceNodeValue = (node) => {
  if (!node?.childNodes || !node?.childNodes?.forEach) {
    return;
  }
  node.childNodes.forEach((n) => {
    if (!!n) {
      if (!!n.nodeValue && isIncludesSource(n.nodeValue)) {
        n.nodeValue = n.nodeValue.replace(sourceReg, targetStr);
      } else if (
        !!n.value &&
        isIncludesSource(n.value) &&
        (!!n.readOnly || !!n.disabled)
      ) {
        n.setAttribute("value", n.value.replace(sourceReg, targetStr));
        n.value = n.value.replace(sourceReg, targetStr);
      } else {
        replaceNodeValue(n);
      }
    }
  });
};
const callback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    const target = mutation.target;
    switch (mutation.type) {
      case "childList": //子节点的增删
        const nodes = mutation.addedNodes;
        nodes.forEach((node) => {
          if (node?.nodeName === "#text" && isIncludesSource(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(sourceReg, targetStr);
            return;
          }
          if (!!node?.innerHTML && isIncludesSource(node.innerHTML)) {
            replaceNodeValue(node);
            return;
          }
        });
        break;
      case "characterData": //文本节点内容的变化
        if (
          !!target &&
          !!target.data &&
          !!target.nodeValue &&
          isIncludesSource(target.nodeValue)
        ) {
          target.nodeValue = target.nodeValue.replace(sourceReg, targetStr);
          return;
        }
        break;
      case "attributes": //元素的属性
        const attributeName = mutation.attributeName;
        if (
          !!target &&
          !!attributeName &&
          ["placeholder", "value"].includes(attributeName) &&
          (!!mutation?.target?.attributes?.value?.value ||
            !!mutation?.target?.attributes?.placeholder?.value)
        ) {
          const info = {
            value: target.attributes?.value?.value,
            placeholder: target.attributes?.placeholder?.value,
          };
          Object.keys(info).forEach((key) => {
            if (!!info[key] && isIncludesSource(info[key])) {
              key === "placeholder" &&
                target.setAttribute(
                  key,
                  info[key].replace(sourceReg, targetStr)
                );
              if (key === "value" && (!!target.readOnly || !!target.disabled)) {
                target.setAttribute(
                  key,
                  info[key].replace(sourceReg, targetStr)
                );
                target.value = info[key].replace(sourceReg, targetStr);
              }
            }
          });
          return;
        }
        break;
    }
  });
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
```

DMP:http 空格编码问题
背景：从实例概览界面的巡检报告进入某个报告详情，显示当前报告缺失，但从菜单的巡检报告列表进入同一个报告可以正常显示报告内容

难点：空格的编码问题

原因：url 拼接错误，重构的一个公共组件有一个替换 url 的功能，新的 url 参数转换为 search 字符串的时候使用了 URLSearchParams.toString()方法,此时会将参数中的空格编码为+,而不是平时常见的%20。

```js
var str = "name=black color";
encodeURI(str); //'name=black%20color'
encodeURIComponent(str); //'name%3Dblack%20color'
new URLSearchParams(str).toString(); //'name=black+color'
```

## 前端安全

甲方会出具一份安全检测报告，对应修改

### dangerouslySetInnerHTML 属性：

插入的内容包含来自用户输入时，这个属性直接设置 HTML 内容，会跳过 React 对 DOM 的默认处理(自动转义)，最终导致 XSS 攻击。

解决方法：

1. 尽量不使用该属性，而是通过 JSX 来插入文本、组件等
2. 在使用之前用 DOMPurify 或类似库进行 HTML 清理，确保插入的 HTML 内容安全

## TODO:

1. 大屏可视化
2. 地图
3. three.js
4. 接口路径失效
5. 低代码平台

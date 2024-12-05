---
outline: deep
---

# JS 库开发(一)

## 开发

实现流程：想法->目标->设计->编码

如何确定开发的库类型?

1. 对业务项目部分功能进行抽象设计，提取通用逻辑并进行额外处理。
2. 现有开源项目无法满足需求或者使用不方便，可以基于该开源项目升级

> 个人开发建议从小的工具库入手，而不是直接选择组件库这种大型项目

## 构建

### 模块化解析

出现背景：随着程序规模扩大，引入第三方库，共享全局作用域会导致命名冲突

特点：模块是一个独立空间，既可引用其他模块，也可被其他模块引用

#### 原始模块

一个函数就可以是一个模块

```js
(function (mod, $) {
  function clone(source) {}
  mod.clone = clone;
})((window.clone = window.clone || {}), jQuery);
```

缺点：需要手动维护依赖的顺序，比如 JQuery 必须在代码之前被引用，否则会报错。随着模块数量增加，这个问题会变得非常棘手。

#### AMD

全名：Asynchronous Module Definition，属于异步模块加载规范，主要用于浏览器端,通过按需加载模块提高了页面的加载性能，但需要借助`RequireJS`加载器，但目前基本已经不用`RequireJS`，因为主流的库(vue,react，Webpack、Rollup )都已经支持 AMD 模块，开发者不再依赖它进行模块加载。

语法：`define(id?,dependencies?,factory)`

案例：

```js
//匿名AMD模块 clone.js
define(function () {
  function clone(data) {}
  return clone;
});
//使用上面定义的模块 index.js
define(["clone"], function (clone) {
  const a = { a: 1 };
  const b = clone(a);
});
```

AMD 规范会根据依赖数组的内容（["clone"]）去加载和注入相关模块。"clone" 模块的返回值会作为参数传递给第二个模块的回调函数。

#### CommonJS

属于同步模块加载规范，主要用于 NodeJS 环境。

```js
// 定义 math.js
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
// 使用 module.exports 导出一个对象
module.exports = {
  add,
  subtract,
};
//使用 app.js
const math = require("./math"); // 导入 math.js 模块
console.log(math.add(2, 3)); // 5
console.log(math.subtract(5, 3)); // 2
```

#### UMD

全名 Universal Module Definition 属于通用模块加载规范，是对前面的模块规范的整合，支持 UMD 的库可以在任何模块环境工作。因为能自动识别当前运行的环境，并选择合适的方式来定义模块

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // 如果环境支持 AMD（如 RequireJS），使用 define 来定义模块
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    // 如果环境支持 CommonJS（如 Node.js），使用 module.exports 导出模块
    module.exports = factory();
  } else {
    // 如果以上条件都不满足，则认为是浏览器环境，并将模块挂载到全局变量上
    root.MyModule = factory();
  }
})(this, function () {
  // 模块的实现逻辑，返回模块的内容
  function add(a, b) {
    return a + b;
  }
  return {
    add: add,
  };
});
```

#### ES Module

ES2015 新增的原生 JS 模块系统，部分浏览器已经支持直接使用 ES Module，不兼容的浏览器可以通过构建工具将 ES6 代码转译成 ES5 代码使用。

```js
export function clone(data) {}
import { clone } from "./clone.js";
```

| 入口文件     | 支持的模块                                  |
| ------------ | ------------------------------------------- |
| index.js     | 原始模块，AMD 模块，CommonJS 模块，UMD 模块 |
| index.esm.js | ES Module                                   |

### 技术体系解析

- 传统体系：依赖关系由库的使用者手动维护
- NodeJS 体系：内置依赖解析系统，`npm init`可以新建模块，package.json 文件定义模块的属性，其中的 main 字段定义了当前模块对应的逻辑入口文件，
- 工具化体系：webpack、vite、rollup

### 打包方案

webpack,rollup,vite

```js
export default {
  input: "src/index.js", // 入口文件路径
  output: [
    {
      file: "dist/bundle.cjs.js", // CommonJS 格式
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js", // ES module 格式
      format: "esm",
    },
    {
      file: "dist/bundle.umd.js", // UMD 格式
      format: "umd",
    },
  ],
};
```

Vite 使用了 Rollup 作为生产构建工具

vite 和 rollup 的区别：

| 特性     | Rollup                                                       | Vite                                                 |
| -------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 核心目标 | 适合库的打包，注重输出文件体积和优化                         | 适合前端应用开发，强调开发体验和快速构建             |
| 构建方式 | 传统的打包工具，适合生产环境的优化打包                       | 开发时使用 ESM 模块和 esbuild，生产时使用 Rollup     |
| 开发体验 | 需要额外配置开发服务器和热更新，适合需要高度定制的构建       | 快速的热更新（HMR），非常流畅的开发体验              |
| 生产构建 | 输出小而高效的文件，适合库的优化和打包                       | 生产构建由 Rollup 处理，输出和 Rollup 类似           |
| 性能     | 构建速度相对较慢，特别是在大项目中，适合生成优化后的生产文件 | 开发时极快的构建，生产构建性能与 Rollup 相当         |
| 适用场景 | 打包 JavaScript 库和工具，优化生产代码                       | 前端应用开发，尤其是 SPA 和现代前端框架开发          |
| 插件生态 | 强大的插件系统，适合高度定制的构建                           | 插件生态快速增长，尤其支持现代前端框架（Vue、React） |

#### 按需加载

按需加载的核心思想是将代码拆分，只在需要时加载资源。具体而言，资源（例如 JavaScript、CSS、图片等）会被分成多个小的模块（chunks），这些模块在初始加载时不会全部加载，而是等待实际需要时再加载。

按需加载的工作流程：

1. 初始加载：当用户访问应用时，浏览器首先加载最小的、必要的代码，通常是应用的入口文件、基础库和当前页面所需的资源。其他不立即需要的代码不会加载。
2. 触发加载：当用户与应用互动（例如点击一个按钮、导航到另一个页面）时，某些额外的资源才会被加载。这些资源可能是某个模块、页面、组件、数据等。
3. 动态加载：根据用户的需求，应用会动态加载相关的代码块。浏览器发出请求并获取这些资源后，应用会继续执行相应的操作。
4. 缓存机制：为了避免重复加载相同的资源，现代浏览器会缓存已经加载的文件。如果用户再次访问相同的资源，浏览器将直接从缓存中读取，而不是重新请求。

按需加载技术依赖：

1. 代码拆分（Code Splitting）
2. 懒加载（Lazy Loading）
3. 路由级别的按需加载（Route-based Lazy Loading）

### 兼容方案

使用转换工具 Babel 将 ES6 代码转换为 ES5 代码；

语法兼容：Babel 为 ES6 的每个特性提供了一个插件，可以让开发者手动选择需要转换的特性；但手动维护这些插件较麻烦，可以使用 @babel/preset-env 插件，简单配置需要兼容的环境即可自动选择插件。

API 兼容：安装 @babel/plugin-transform-runtime 和@babel/runtime-corejs2 插件，可以直接在库的源码中使用 ES6 的 API

## 单元测试

使用框架推荐的测试方案即可,UI 自动化测试框架 Cypress

### 设计测试用例

对于函数的测试，每个参数一组，在对 a 参数测试时，保证其他参数无影响。每个参数的测试用例包括正确/错误/边界值测试 3 种

```js
describe("function clone", function () {
  describe("param1", function () {
    it("正确的测试用例", function () {});
    it("错误的测试用例", function () {});
    it("边界值测试用例", function () {});
  });
  describe("param2", function () {
    it("正确的测试用例", function () {});
    it("错误的测试用例", function () {});
    it("边界值测试用例", function () {});
  });
});
```

### 验证测试覆盖率

指标：

- % Stmts（语句覆盖率）：覆盖的语句占总语句的比例。
- % Branch（分支覆盖率）：覆盖的条件分支占总条件分支的比例（如 if/else）。
- % Funcs（函数覆盖率）：覆盖的函数占总函数的比例。
- % Lines（行覆盖率）：覆盖的代码行占总代码行的比例。
- Uncovered Line：没有被覆盖到的行号，可以用于找漏测的逻辑

工具：

1. Jest:默认集成代码覆盖率的支持
2. Mocha + nyc

## 开源

### 开源协议

MIT,BSD,Apache

### 文档完善

使用 markdown 编写，可包括 Readme.md,待办清单 Todo.md，变更日志 ChangeLog.md，API 文档

### 发布

- npmjs
- [Verdaccio](https://zhaomenghuan.js.org/blog/npm-private-repository-verdaccio.html) + pnpm

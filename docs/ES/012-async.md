---
outline: deep
---

# 异步编程

## 同步和异步

### 浏览器进程

浏览器以**多进程**方式运行，**渲染进程**是其中之一

| 进程           | 作用                                            |
| -------------- | ----------------------------------------------- |
| GPU 进程       | 用于 3D 绘制                                    |
| Brower 进程    | 前进/后退/窗口管理(多页面)/网络资源管理(下载等) |
| 第三方插件进程 | 每一类插件对应一个进程，且使用时才创建          |
| 渲染进程       | 页面渲染/脚本执行/事件处理                      |

渲染进程分类：

- JavaScript 引擎线程
- GUI 渲染线程
- 事件触发线程
- 定时器线程
- HTTP 请求线程

### 单线程

JS 代码由 JavaScript 引擎线程处理。由于 JS 引擎线程是单线程，每次只能执行一个任务，会导致用户体验差。为了优化用户体验引入了异步的操作。

单线程概念：一次只能执行一个任务，如果有多个任务的话需要排队。

本质：异步代码并不会交给 JavaScript 引擎线程处理，而是会交给浏览器其他线程处理。

::: warning
JS 不采用多线程设计的原因:

JS 涉及 DOM 操作，多线程的情况下，两个线程一个往 DOM 添加内容，一个又在删除 DOM，浏览器无法判断以哪个线程为准。
:::

### 同步代码和异步代码

JS 引擎线程遇到异步代码，会先跳过异步代码执行后续的同步代码，然后等到未来某个事件，再去执行之前的异步代码。

常见异步代码分类及其回调函数添加时机：

1. 定时器：时间到达时
2. Ajax：请求完成后
3. DOM 事件：事件触发时
4. 读写文件
5. 数据库操作

## 事件循环

1. JS 引擎线程看作主线程，所有同步任务都在这个主线程上执行
2. 主线程之外有一个异步队列，专门用于放置异步任务
3. 执行完所有同步任务后，主线程读取异步队列，依次执行队列里的任务
4. 事件触发线程会持续监听异步队列，重复步骤 3

对于异步任务，JS 引擎进程会将其交给其他线程去执行，比如 setTimeout 任务，浏览器的渲染进程会另外开启一个定时器线程执行。定时器处理结束后，会通知事件触发线程将定时器的**回调函数**推送到任务队列的末尾。

JS 执行完所有同步任务才会执行任务队列里的函数。事件触发线程会持续监听是否有异步任务进入队列，然后再轮询执行。

### for 循环和 setTimeout

```js
for (var i = 0; i < 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 3000);
}
```

上面的输出预期是每隔 3s 打印最新的 i，但实际上只会一次性打印出 4 个 4
解决方法：1. var 替换为 let 2. 使用闭包实现

```js
for (var i = 0; i < 4; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 3000);
  })(i);
}
```

## Promise 对象

### 概念

背景：一般情况下，异步操作不可控

作用：控制异步操作的执行顺序

状态：pending,fulfilled,rejected

```js
const p = new Promise((resolve, reject) => {
  //异步操作
  //成功返回
  resolve();
  //失败返回
  reject();
});
p.then(() => {
  //成功后执行下一步操作
});
p.catch(() => {
  //失败后执行下一步操作
});
```

### 实际应用

图片加载

```js
const img = new Image();
img.src = "/logo.png";
const p = new Promise((resolve, reject) => {
  img.onload = function () {
    resolve(img);
  };
  img.onerror = function () {
    reject("图片加载失败");
  };
});
p.then((img) => {
  document.body.appendChild(img);
});
p.catch((error) => {
  console.log(error);
});
```

### Promise 方法

- Promise.resolve(value)
- Promise.reject(value)
- Promise.all([promise1,promise2])
- Promise.race([promise1,promise2])
- Promise.prototype.finally(()=>{})

## async 和 await

### async

作用：定义异步函数

语法：`async function fn(){}`，这个函数返回的是一个 Promise 对象

### await

只有在 async 函数内部才可以使用 await

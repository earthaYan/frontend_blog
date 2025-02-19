---
title: 简历梳理-专业技能
titleTemplate: 面试复盘
outline: "deep"
---

# 简历解析

## TypeScript

### TS 给你的感受是什么

1. 类型安全：让开发者在编写代码期间就考虑类型问题，避免了很多运行时错误
2. 学习曲线：开发者本身有 JS 基础，他的学习成本不高，但收益巨大
3. 渐进式引入：对于旧项目不需要完全重写，可以逐步引入

### 说说你了解的 TS 知识点

1. 类型推断：根据给出的值推断变量的类型，减少显式声明
2. interface/type 关键字定义数据类型
3. 联合类型和交叉类型：或和与
4. 类型别名：`type ID = string | number;`
5. 函数声明的`?`：定义可选参数,必须放到最后
6. Omit/Pick 等函数
7. 泛型

### typescript 的配置文件

1. compilerOptions：
   - target：指定编译后的 JavaScript 版本,公司项目里一般都是`es5`
   - module：指定生成的模块系统,公司项目里一般都是`esnext`
2. include：指定编译过程中要包含的文件或目录
3. exclude：指定编译过程中要排除的文件或目录，默认 node_modules 会被排除
4. paths:设置模块路径映射，用于简化模块导入路径

### 你了解泛型吗


## Vue

### Vue2 和 Vue3 的区别

#### 性能提升：


#### 引入组合式 API

#### Fragment, Teleport

- Fragment：允许组件返回多个根节点，无需额外的包裹元素
- Teleport：类似于 react 中的 Portal，可以让子组件渲染在父组件以外的 DOM 节点上,比如模态框

#### 生命周期钩子

- `created`被移除,用 `setup` 取代。`setup` 在组件实例化之前被调用，提供了更早期的生命周期钩子。
- `beforeDestroy` 被替换为 `beforeUnmount`
- `destroyed` 被替换为 `unmounted`

#### v-model 语法

vue2 里 v-model 默认绑定的 value 属性，而 vue3 可以自定义绑定的属性和事件,比如`<MyComponent v-model:foo="value"></MyComponent>`



### computed 和 watch 以及 普通方法 的区别

- computed:计算属性，用于基于现有的响应式数据计算和返回一个值。只有当其依赖的数据变化时，才会重新计算
- watch:侦听器，用于观察响应式数据的变化，并在数据变化时执行异步或开销较大的操作，比如发起网络请求,无返回值
- methods:普通方法，每次调用时执行

### vue 的生命周期

#### vue2

1. 创建

- beforeCreate:实例刚被创建
- created:实例创建完成，数据观测和事件配置已完成，但模板尚未挂载到 DOM 上。此时可以访问数据和方法，但无法访问 DOM。

2. 挂载

- beforeMount：模板已编译，但尚未挂载到实际的 DOM 上。此时可以执行一些在挂载前的逻辑。
- mounted：模板已挂载到 DOM 上。此时可以操作 DOM、执行 AJAX 请求等。

3. 更新

- beforeUpdate：数据变化后，DOM 尚未更新。此时可以访问到更新前的 DOM 状态。
- updated：数据变化后，DOM 更新完成。此时可以访问到更新后的 DOM。

4. 销毁

- beforeDestroy：实例销毁之前，相关的事件和观察者（watcher）会被移除。可以执行一些清理操作。
- destroyed：实例销毁完成，所有的事件监听器和子实例都已被销毁。

#### vue3

1. 创建

- setup()：在实例化时执行，所有的初始化逻辑可以直接放到 setup 中

2. 挂载

- onBeforeMount()：模板编译完成，挂载到实际 DOM 上之前调用。此时 el 仍然是空的。
- onMounted():实例挂载到 DOM 上之后调用。此时可以操作 DOM、发起请求等。

3. 更新

- onBeforeUpdate():数据变化前调用，DOM 尚未更新。可以访问到更新前的 DOM。
- onUpdated():数据变化后，DOM 更新完成后调用。可以访问更新后的 DOM。

4. 销毁

- onBeforeUnmount():实例销毁之前，相关的事件和观察者会被移除。
- onUnmounted():实例销毁完成，所有的事件监听器和子实例都已销毁。

## React

### react18 的变更

1. 引入了并发渲染的支持:react 可以在空闲时间中逐步完成渲染工作。这使得在高负载下保持响应性，减少页面卡顿
2. 引入了自动批处理:自动将多个状态更新合并为一个渲染，react17 只有 setState 在事件处理程序中会自动批处理,但 18 中扩展到了 setTimeout、Promises、native events 和 React 的其他异步操作。

### 写过哪些公共 hook 或者组件

#### 获取 url 中的查询参数

作用：获取 url 中的查询参数

实现：

1. 从 React Router 的 useLocation hook 获取 URL 中的查询参数，并返回一个 URLSearchParams 对象
2. 通过 useMemo 来避免每次重新渲染时都重新创建 URLSearchParams 实例，只有在 location 变化时才会重新计算

```js
const useParamsByLocation = () => {
  const location = useLocation();
  return useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location]);
};
```

#### 节流

节流的核心思想是限制某个操作的执行频率，即在一定时间内只允许执行一次，而不管操作被触发多少次。高频率的事件，如滚动、窗口尺寸变化、键盘按键等

```js
import { useState, useEffect } from "react";
const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
};
export default useThrottle;
```

#### 防抖

防抖是指在连续触发某个操作时，只有在一段时间内没有新的操作时，才执行该操作。常用于输入框搜索等。

```js
import { useState, useEffect } from "react";
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 设置定时器，延迟执行 setDebouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //  清除上一个定时器，确保延迟逻辑生效
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 当 value 或 delay 发生变化时重新执行
  return debouncedValue;
};
```

### React 的生命周期

react17 函数组件没有传统类组件的生命周期方法。而是通过 React Hooks 实现。

### useCallback 和 useMemo 的区别是什么

目的：避免不必要的重新计算和重新创建

- useMemo:用于缓存函数的返回值。当某个计算非常昂贵，且只需要在某些依赖发生变化时才重新计算时，useMemo 可以用来优化性能。它返回一个缓存的计算值，只有在依赖项发生变化时才会重新计算。目的是缓存计算结果，避免每次渲染时都进行计算
- useCallback 用于缓存函数的引用。它的作用是防止在每次渲染时都创建新的函数引用，从而避免传递给子组件的函数每次都改变，造成不必要的渲染

### useContext 是如何工作的？

### React 性能优化

### 什么是 Redux？为什么要使用它

状态管理工具，管理全局状态。

工作原理：

1. Store 存储着应用的整个状态。
2. Action 描述了状态的变化（通常包含 type 和 payload，后者是附加的相关数据）。
3. Reducer 是纯函数，根据 Action 来决定如何更新 Store 的状态。
4. 通过调用 dispatch 方法，Action 被分发到 Reducer，并根据当前的状态和 action，生成新的状态。
5. 视图组件通过 selector 获取状态并渲染。

### 受控组件和非受控组件

受控组件是指其表单元素的值（比如 <input>、<textarea> 等）由 React 状态管理，状态的变化完全依赖于 React。

通过 value 和 onChange

## 安全问题

### 说说 XSS 以及解决方案

跨站脚本攻击,通过将恶意脚本嵌入到网页中，当用户访问该页面时，恶意脚本会在用户的浏览器中执行。

主要目的是窃取用户数据（如 cookies、会话信息等）、篡改页面内容或进行其他恶意操作

解决方案：

1. 对输出到页面的用户数据进行编码，确保特殊字符不会被浏览器当作代码执行
2. 对用户输入进行过滤，确保只允许符合格式的数据
3. 避免使用 dangerouslySetInnerHTML 这些属性
4. 定期检测出安全检测报告，及时发现

### 说说 csrf 以及解决方案

跨站请求伪造，通过伪造用户的请求，在用户不知情的情况下，利用已登录的身份执行不当操作。

主要目的：利用用户已经登录并具有有效会话的前提下，伪造请求发送到目标网站，进行恶意操作

场景：银行账户转账：

- 假设用户已经登录了银行账户并具有转账权限。
- 攻击者发送带有恶意转账请求的邮件或网页链接，诱使用户点击。
- 用户点击后，恶意请求携带用户的身份信息（如 Cookie），银行服务器无法- 判断请求是否真实，执行转账操作，将钱转移到攻击者的账户。

解决方案：

1. 避免在不安全的请求方法（如 GET）中进行敏感操作。应当使用 POST、PUT 或 DELETE 等方法来处理修改或敏感的数据操作。

## 兼容性

### 说一说你遇到过的兼容性问题

### h5 程序嵌入 app 和公众号程序在安卓和 ios 设备上产生的兼容性问题

## 性能优化

### 静态资源在浏览器加载过程以及页面性能优化点

## Linux & docker

### 说一些你用过的命令

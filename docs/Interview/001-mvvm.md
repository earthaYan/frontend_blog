---
outline: [1, 2]
---

# 框架相关

## vue 和 react 的使用体验上的区别

相同点：都是以虚拟 DOM 为基础，组件化方式组织应用，不需要关注 DOM 细节

不同点：

- vue 更容易入门，react 需要了解 jsx 相关知识，倾向于通过 js 灵活控制，入门可能较高
- vue 使用模板语法，将模板、样式、逻辑划分开，可以选配 jsx 支持；react 默认使用 jsx 编写组件，无需引入额外的概念

## vue/react 状态管理器及使用方法

vue: Pinia
::: code-group

```vue [创建store]

```

:::

```js
//创建store
import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
//使用
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
const app = createApp(App);
app.use(createPinia());
app.mount("#app");
//组件中使用
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
<script setup>
import { useMainStore } from '../store'
const store = useMainStore()
const { count, doubleCount, increment } = store
</script>
```

react:react-redux+redux-toolkit

```jsx
import { Provider } from "react-redux";
import store from "./redux/store";
​
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
//创建store
import { configureStore } from "@reduxjs/toolkit";
export default configureStore({
  reducer: {
    // 配置 reducer
  }
});
//具体到某个文件
const s1=createSlice({
    name:'xxx',
    initialState,
    reducers:{
        initClickHouseModalState: (state, action: PayloadAction<ModalState>) => {
        state.global.modalStatus = action.payload;
        },
    }
})
export const  {xx}=s1.actions
export default s1.reducer
//组件内获取数据
const { list } = useSelector(state => state.todo);
//组件内调用
const dispatch = useDispatch();
//封装供具体组件调用
const resetBatchState = () => {
    dispatch(resetBatchOperatorState());
};
```

## react18 的变更

## 写过哪些公共 hook 或者组件

公共 hooks：`useParamsByLocation`,用于获取 URL 中的查询参数

```js
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
const useParamsByLocation = () => {
  const location = useLocation();
  return useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location]);
};
```

## a
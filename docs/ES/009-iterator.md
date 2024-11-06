---
outline: deep
---

# 可迭代对象

又名迭代器、Iterator 对象，具有 2 个 特点：

1. 具有`[Symbol.iterator]`属性
2. 可以用 for...of 遍历

## 分类

### 内置

字符串、数组、类数组、Set、Map

### 自定义

```js
const sequence = {
  items: ["red", "green"],
  [Symbol.iterator]() {
    let i = 0;
    const that = this;
    return {
      next() {
        if (i < that.items.length) {
          return {
            value: that.items[i++],
            done: false,
          };
        } else {
          return { value: that.items[i++], done: true };
        }
      },
    };
  },
};
for (const item of sequence) {
  console.log(item + " "); //red green
}
```

`next()`方法返回一个对象，value 属性表示当前遍历到的值,done 属性表示这次遍历是否还有下一步状态，true 表示没有下一步，false 表示还有下一步

## for...of

语法：`for (const item of 可迭代对象) {}`

特点：用于遍历可迭代对象，不能用于遍历 Object 对象，遍历 Object 对象通常用`for...in`，该语法可用于遍历可迭代对象和 Object 对象

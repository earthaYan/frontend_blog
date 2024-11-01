---
outline: deep
---

# 对象的扩展

## 简写语法

### 属性简写

如果对象的属性值是一个变量，且变量名和属性名一致，就可以使用简写

```js
const foo = "foo";
const bar = "bar";
const obj = { foo: foo, bar: bar };
//简写形式
const obj = { foo, bar };
```

### 方法简写

```js
const obj = {
  foo: function () {},
  bar: function () {},
};
// 简写形式
const obj = {
  foo() {},
  bar() {},
};
```

## ES6 新增方法

| 方法                                | 作用                           | 备注                                                  |
| ----------------------------------- | ------------------------------ | ----------------------------------------------------- |
| Object.is(a,b)                      | 判断 a 和 b 的类型及值是否相等 | 和`===`结果相同,NaN 例外                              |
| Object.assign(obj1,obj2,...)        | 合并多个对象到第一个对象       | 会改变第一个对象，如存在相同属性则值会覆盖,可用于数组 |
| Object.freeze(obj)                  | 将一个普通对象转换为不可变对象 | 冻结后不支持增删属性和修改属性值                      |
| Object.keys(obj)                    | 遍历获取对象的 key 集合        | 返回一个数组，元素为对象中的键                        |
| Object.values(obj)                  | 遍历获取对象的 value 集合      | 返回一个数组，元素为对象中的属性值                    |
| Object.getPropertyOf(obj)           | 获取某一个实例对象的原型       | 不是构造函数原型                                      |
| Object.getOwnPropertyNames(obj)     | 获取对象自身所有的属性名       | 返回一个数组，元素为属性名                            |
| Object.defineProperty(obj,key,desc) | 给对象定义一个新属性           | desc 是一个配置对,;;象                                |

desc 配置对象

| 属性 /方法   | 作用                     | 默认值    |
| ------------ | ------------------------ | --------- |
| 数据属性     |
| value        | 属性的值                 | undefined |
| configurable | 是否允许被删除           | false     |
| enumerable   | 是否允许被遍历           | false     |
| writable     | 是否允许被修改           | false     |
| 访问器属性   |
| get()        | 读取属性时自动调用的函数 |           |
| set(value)   | 写入属性时自动调用的函数 |           |

:::warning
get/set()和 value/writable 不能共存，因为数据属性只能通过 value 和 writable 来配置属性值，而访问器属性只能通过 get/set 来配置属性值【即数据属性和访问器属性不能同时存在于同一个属性上】
:::

## 使用 get/set 实现双向数据绑定

```js
<input type="text" id="txt" />
<p id="content"></p>
window.onload = function () {
  const oTxt = document.querySelector("#txt");
  const oContent = document.querySelector("#content");
  //定义一个对象
  const obj = {};
  Object.defineProperty(obj, "text", {
    get() {},
    set(value) {
      oTxt.value = value;
      oContent.innerText = value;
    }
  });
  oTxt.addEventListener(
    "keyup",
    function (e) {
      obj.text = e.target.value;
    },
    false
  );
};
```

## 浅拷贝和深拷贝

浅拷贝：若**对象的属性**属于基本类型，则复制值；若属于引用类型，则复制它的引用，比如`Object.assign`

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, name: { first: "jack", last: "ma" } };
Object.assign(obj1, obj2);
obj2.name.first = "Lucy";
console.log(obj1.name.first, obj2.name.first); //Lucy,Lucy
```

深拷贝：不管属性是什么类型，都只复制它的值

::: code-group

```js[递归]
//可以处理各种数据类型
//可能在处理循环引用时抛出错误，需要额外的逻辑来处理
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // 基础情况
    }
    // 处理数组和对象
    const copy = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        // 确保不复制原型链的属性
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key]); // 递归调用
        }
    }
    return copy;
}
// 示例
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3;
console.log(original.b.c); // 输出 2
```

```js[json]
//不能复制函数、undefined、Symbol、Date、RegExp 等特殊对象
//会丢失对象原型链信息
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 示例
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3;

console.log(original.b.c); // 输出 2，表示原对象未受影响

```

```js[structuredClone]
const original = { a: 1, b: { c: 2 } };
const cloned = structuredClone(original);
cloned.b.c = 3;

console.log(original.b.c); // 输出 2

```

:::

## 获取全局对象

- ES5:
  - 浏览器环境：window
  - NodeJS 环境：global
- ES6:globalThis(会自动区分出环境，输出 window 或者 global)

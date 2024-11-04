---
outline: deep
---

# 新增数据类型

## 数据类型

- 基本数据类型：number,string,boolean,undefined,null,Symbol
- 引用数据类型：Object

### ES6 新增基本数据类型 Symbol

语法：`Symbol(XXX)`

作用：symbol 函数生成一个 Symbol 值，这个值是独一无二的

使用同一个 symbol 值：`Symbol.for(xxx)`

- 相同点：都是生成一个 Symbol 值
- 不同点：Symbol()每次调用 Symbol 都会返回一个全局的唯一值;Symbol.for()创建的值会放在全局作用域的"Symbol 注册表"，每次调用 Symbol.for()都会先检查注册表中是否已有 key,如果不存在会创建一个新的 Symbol 值，否则返回该 key 的 Symbol 值

```js
const a = Symbol();
const b = Symbol();
console.log(a === b); //false
const a = Symbol.for();
const b = Symbol.for();
console.log(a === b); //true
```

:::warning
Object.getOwnPropertyNames()获取非 Symbol 类型的属性<br/>
Object.getOwnPropertySymbols()获取 Symbol 类型的属性
:::

### Symbol 使用场景

Symbol 值常用作对象的属性。

```js
const sym1 = Symbol("description1");
const sym2 = Symbol("description2");
const obj = {
  [sym1]: "value1",
  [sym2]: "value2",
};
console.log(obj[sym1]); // 输出 'value1'
console.log(obj[sym2]); // 输出 'value2'
```

## 新增集合类数据结构

### Set

特点：元素是有序的且 Set 的元素唯一，如果有相同的值则只会保留一个,自带去重功能

语法：`const s=new Set(参数)`，参数可以是数组或者类数组。`typeof s`结果为 object。

```js
const s = new Set([1, 2, 3]);
const li = document.querySelector("li");
const t = new Set(li);
const len = s.size;
```

内部方法：

| 方法                           | 作用                    | 备注                   |
| ------------------------------ | ----------------------- | ---------------------- |
| s.add(value)                   | 添加元素                |
| s.delete(value)                | 删除元素                |
| s.clear()                      | 清空 Set                |
| s.has(value)                   | 判断是否存在某元素      |
| s.forEach((value,key,set)=>{}) | 遍历 Set 中的元素       |
| s.keys()                       | 获取到所有的 key        | 返回可迭代对象，非数组 |
| s.values()                     | 获取到所有的 value      | 同上                   |
| s.entries()                    | 获取到所有的 key=>value | 同上                   |

使用场景：

1. 数组自动去重

```js
const arr = [1, 2, 13, 1];
//Set+Array.from
const res1 = Array.from(new Set(arr));
//Set+展开运算符
const res2 = [...new Set(arr)];
```

2. 集合操作

```js
const a = new Set([1, 2]);
const b = new Set([1, 3]);
//并集
const c = new Set([...a, ...b]); //Set[1,2,3]
//交集
const arr = [...a].filter((item) => {
  if (b.has(item)) {
    return arr;
  }
});
const d = new Set(arr); //Set[1]
//差集
const arr1 = [...a].filter((item) => {
  if (!b.has(item)) {
    return arr;
  }
});
const arr2 = [...b].filter((item) => {
  if (!a.has(item)) {
    return arr;
  }
});
const e = new Set([...arr1, ...arr2]);
```

### Map

普通对象的 key 只能是字符串或者 Symbol 值，但 Map 的 key 可以是任意值

语法：`const m=new Map(二维数组)`，其键是有序的，插入的顺序会被保留。通过`m.size`获取元素个数

```js
const m=  new Map([["name","ka"],["age":12]]);
console.log(m)//Map {"name"=>"ka","age"=>12}
```

内部方法：

| 方法                           | 作用                   |
| ------------------------------ | ---------------------- |
| m.get(key)                     | 获取元素               |
| m.set(key,value)               | 添加元素               |
| m.delete(key)                  | 删除元素               |
| m.clear()                      | 清空 Map               |
| m.has(key)                     | 判断是否存在某个键     |
| m.forEach((value,key,map)=>{}) | 遍历 map 元素          |
| m.keys()                       | 获取到所有的 key       |
| m.values()                     | 获取到所有的 value     |
| m.entries()                    | 获取到所有的 key,value |

使用场景：
需要用一种特殊的值(比如 dom 节点)来充当对象的 key 的时候，用 map 最合适

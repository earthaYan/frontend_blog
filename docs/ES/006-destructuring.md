---
outline: deep
---

# 解构赋值

对对象进行结构拆解，包括数组、对象和字符串

解构赋值条件：等号左右 2 边模式相同，即变量名和变量的个数一致

字符串解构赋值语法：`const  [a,c]='ac'`

## 开发技巧：

```js
//1. 指定别名
const { name: UserName, age: UserAge } = user;
//2.部分结构
const { name } = user;
//3.嵌套解构
const {
  name: { first, last },
  age,
} = user;
//4.解构方法
const { min, max } = Math;
```

:::tip
指定别名后，原来的属性名会报错
:::

## 实际使用场景：对象

函数参数是一个对象，用于解决列表形式的参数的有序性

```js
function fn(user) {
  const { name, age } = user;
}
fn({ name, age }); //无需在意属性顺序
function fn(name, age) {}
fn(name, age); //需要关注属性顺序
```

## 实际使用场景：数组

1. 交换变量值

ES5

```js
var a = 3,
  b = 4;
var temp;
temp = a;
a = b;
b = temp;
console.log(a, b);
```

ES6

```js
var a = 3,
  b = 4;
[a, b] = [b, a];
```

2. 函数返回值

如果一个函数需要返回多个值，最好是以数组形式返回。之后可以对该数组进行解构赋值

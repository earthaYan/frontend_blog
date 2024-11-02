---
outline: deep
---

# 函数

ES5 定义函数的 2 种方式：

1. 函数声明
2. 函数表达式

## 箭头函数

```js
function fn() {}
const fn = function () {};
//箭头函数，简化函数表达式
const fn = (a, b) => {};
```

箭头函数本身没有 this，它的 this 继承自外层的 this

```js
function Person(name) {
  this.name1 = name;
}
Person.prototype.getName = () => {
  console.log("name1:" + this.name1);
};
const p = new Person("jack");
p.getName(); //undefined,箭头函数内部的this指向的是window
```

不适用场景：

1. 函数声明
2. 构造函数：构造函数必须使用 function
3. 原型:原型上的方法必须使用 function 定义

适用场景：

1. 简化代码，多用于回调函数
2. 解决 ES5 中 this 指向错误的问题

```js
window.a = "window";
var obj = {
  a: "obj",
  fn: function () {
    setTimeout(function () {
      console.log(this.a); //window
    });
  },
};
//传统解决方式：that变量
window.a = "window";
var obj = {
  a: "obj",
  fn: function () {
    const that = this;
    setTimeout(function () {
      console.log(that.a); //obj
    });
  },
};
// 箭头函数
window.a = "window";
var obj = {
  a: "obj",
  fn: function () {
    setTimeout(() => {
      console.log(this.a); //obj
    });
  },
};
```

## 参数默认值

定义参数默认值：

```js
//ES5
function Ball(radius) {
  this.radius = radius || 10;
}
//ES6
function Ball(radius = 10) {
  this.radius = radius;
}
```

## name 属性

用处：获取函数名称

语法:`fn.name`



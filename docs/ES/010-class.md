---
outline: deep
---

# 类 class

## 类的定义

ES5 中定义一个类，只能通过构造函数实现，而在 ES6 可以通过 class 关键字来定义类
::: code-group

```js [ES5]
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
var p = new Person("jack");
p.sayName(); //jack
```

```js [ES6]
class Person {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
const p = new Person("jack");
p.sayName(); //'jack'
```

:::
ES6 的 constructor 相当于 ES5 的构造函数。本质上 ES6 的 class 语法是 ES5 的 prototype 机制的语法糖

## 静态方法

面向对象最常用的功能之一，指直接使用类名调用的方法，比如`Object.assign()`

::: code-group

```js [ES5]

```

```js [ES6]

```

:::

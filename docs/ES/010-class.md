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

```js [ES7]
class Person {
  name = "jack";
  sayName = () => {
    console.log(this.name);
  };
}
```

:::
ES6 的 constructor 相当于 ES5 的构造函数。本质上 ES6 的 class 语法是 ES5 的 prototype 机制的语法糖

## 静态方法

面向对象最常用的功能之一，指直接使用类名调用的方法，比如`Object.assign()`

- 静态方法可以被继承，并且子类可以通过 super 或直接调用父类的静态方法。
- 子类也可以重写父类的静态方法，就像普通的实例方法一样。

::: code-group

```js [ES5]
Person.sayHi = function () {
  console.log(hello);
};
```

```js [ES6]
class person {
  static sayHi() {
    console.log("hello");
  }
}
```

```js [ES7]
class person {
  static sayHi = () => {
    console.log("hello");
  };
}
```

:::

## 类的继承

关键字:`extends`,且后面只能跟一个父类
::: code-group

```js [无参数]
class People {
  constructor() {
    this.type = "Human";
  }
  getType() {
    console.log(this.type);
  }
}
class Person extends People {
  constructor() {
    super();
    this.name = "jack";
  }
  getName() {
    console.log(this.name);
  }
}
```

```js [带参数]
class People {
  constructor(type) {
    this.type = type;
  }
  getType() {
    console.log(this.type);
  }
  static SayHi() {
    console.log("hello parent");
  }
}
class Person extends People {
  constructor(type, name) {
    super(type);
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
const p = new Person("Human", "Jack");
p.getType(); //Human
p.getName(); //Jack
Person.sayHi();
```

:::

- 子类的 constructor 必须包含父类 constructor 的参数
- 子类 constructor 内部必须执行一次 super 方法，否则新建实例会报错。

  > 因为子类继承了父类的构造函数，而 super() 的作用是调用父类的构造函数，初始化父类的 this 对象，确保子类可以正确继承父类的实例属性。

- super 方法必须在 constructor 内部的顶部执行

---
outline: deep
---

# 变量和常量

## 作用域

ES5:全局作用域，局部作用域(函数作用域)

ES6:块级作用域

## 变量 var

作用：ES6 出现前用于声明变量的关键字

缺点：

- 无块级作用域
- 存在变量提升

### 块级作用域

通过 let 或者 const 来体现，`{}`内定义的变量属于块级作用域，在`{}`外部无法访问到

```js
if (true) {
  var site = 111;
}
//111
console.log(site);

if (true) {
  let site1 = 222;
}
//site1 is not defined at eval
console.log(site1);
```

### 变量提升

如果用`var`来声明变量，JS 从上到下执行代码时，会做预处理。

进入 JS 环境，JS 引擎并不会立刻从上到下执行代码，而是先扫描所有代码
，将`var`声明的变量集合在一起，组成一个词法环境(LE)

```js
//undefined
console.log(a);
var a = 222;

//ReferenceError: site1 is not defined
console.log(site1);
var site2 = 222;
```

比如上述代码中，假设 JS 是立刻从上到下执行代码，那么`console.log`就会报错，因为运行到这里时 JS 并不知道 a 是什么；

但实际是 JS 会先扫描所有代码，把`var a;`提升到顶部（先声明 a）,此时 a 的值就是`undefined`

## 变量 let

### 特点

- 只在代码块（块级作用域）内有效

```js
if (true) {
  let a = 1;
}
//在代码块以外访问会报错
//ReferenceError: a is not defined
console.log(a);
```

- 同一代码块中不允许重复声明

```js
var a = 1;
var a = 2;
//打印出2
console.log(a);

let a = 2;
var a = 1;
//SyntaxError: Identifier 'a' has already been declared.
console.log(a);
```

- 不存在变量提升

用`let`声明的变量必须先声明再使用

```js
//undefined
console.log(b);
var b = 1;
//ReferenceError: Cannot access 'a' before initialization
console.log(a);
let a = 1;
```

- 不会成为 windows 的属性

在全局作用域中，`var`定义的变量可以用`window.xx`访问到，而`let`不行

```js
var a = 2;
let b = 232;
console.log(window.a); //2
console.log(window.b); //undefined
```

### 场景使用

场景：用来计数的循环变量泄露为全局变量

```js
//html
<button>1</button>
<button>2</button>
<button>3</button>
<button>4</button>
<button>5</button>
//js
window.onload = function () {
  var oBtn = document.querySelectorAll("button");
  for (var i = 0; i < oBtn.length; i++) {
    oBtn[i].onclick = function () {
      console.log(i + 1);
    };
  }
};
```

这里不管点击哪个按钮，结果都是 6，因为 for 循环中的 var i 是全局变量，所有按钮共享同一个 i。当点击事件触发时，for 循环已经完成，i 的值已经是 6。

在没有 let 之前解决这个问题只能通过闭包,即：立即执行函数表达式 (IIFE) 将当前 i 的值传入，以保存每次迭代中的 i 值：

```js
window.onload = function () {
  var oBtn = document.querySelectorAll("button");
  for (var i = 0; i < oBtn.length; i++) {
    (function (i) {
      oBtn[i].onclick = function () {
        console.log(i + 1);
      };
    })(i);
  }
};
```

而`let`可以简单解决该问题，这两种方法的本质都是在每次循环中创建一个单独的新作用域，从而使每个事件处理函数都能够“捕获”到当前循环中的那个 i 值

## 常量 const

作用：声明常量，声明后不允许修改，准确来说是 **保存变量值的内存地址** 能修改

1. 如果是基础类型的值，声明后不能修改该值
2. 如果是引用类型的值，可以修改内部的属性值

```js
const person = { a: "jack" };
console.log(person);
person.b = 111;
console.log(person);
//Uncaught TypeError: Assignment to constant variable.
person = { a: 222 };
console.log(person);
```

特点：同 let 一致

## 暂时性死区

使用上述 2 个关键字声明变量时，会形成一个封闭的且包含该变量的块级作用域。暂时性死区是变量声明（作用域开始）到初始化之间的区域，无法在声明前访问该变量

## 最佳实践

实际开发中，能用`const`的就不用用`let`

1. `const`可读性更好
2. 可以避免无意间修改变量导致的错误

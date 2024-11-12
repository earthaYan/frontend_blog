---
outline: deep
---

# Proxy & reflect

## Proxy

作用：用来代理某个对象，即当访问某个对象时，并不直接访问，而是先访问它的 proxy,而这个拦截的过程可以包含一些自定义行为。

语法：`const p=new Proxy(target,handler)`

参数理解：

- target：原对象
- handler：配置对象

```js
const person = { name: "jack", age: 23 };
const handler = {
  get(obj, key, proxy) {
    console.log(key);
    return obj[key];
  },
};
const p = new Proxy(person, handler);
console.log(p.name);
```

### 常用的拦截方法

1. 拦截读操作

```js
get(obj, key, proxy){
    // ...
    return obj[key]
}
```

2. 拦截写操作

```js
set(obj,key,value){
    //...
    obj[key]=value
}
```

3. 拦截 in 操作

```js
has(obj, key){
    //...
    return key in obj
};
```

4. 拦截 delete 操作

```js
deleteProperty(obj,key){
    //...
    delete obj[key]
    return true
}
```

5. 拦截遍历操作

```js
ownKeys(obj){
    //...
    return Object.keys(obj8)
}

```

### 常见使用场景

1. 实现真正的私有属性

命名上通常用`_`表明私有属性，实际实现需要借助 Proxy

- 不能访问到私有属性值，访问则返回 undefined
- 不能修改或删除私有属性
- 不能遍历私有属性，包括 in/Object.keys()/Object.getOwnProperty()

```js
const person = { name: "jack", _age: 24 };
const handler = {
  get(obj, key, proxy) {
    if (!key.startsWith("_")) {
      return obj[key];
    } else {
      return undefined;
    }
  },
  set(obj, key, value) {
    if (!key.startsWith("_")) {
      obj[key] = value;
    }
  },
  has(obj, key) {
    if (!key.startsWith("_")) {
      return key in obj;
    }
  },
  deleteProperty(obj, key) {
    if (!key.startsWith("_")) {
      delete obj[key];
      return true;
    }
  },
  ownKeys(obj) {
    const result = Object.keys(obj).filter((item) => {
      return !item.startsWith("_");
    });
    return result;
  },
};
//Proxy对象
const p = new Proxy(person, handler);
//访问
console.log(p._age); //undefined
//修改
p._age = 21;
p.name = "log";
console.log(p); //{ name: 'log', _age: 24 }
// //删除
delete p._age;
console.log(p); //{ name: 'log', _age: 24 }
// //遍历
console.log(Object.keys(p)); //['name']
```

2. 保证数据的准确性

比如要求某个属性值必须是字符串或者属性值只能在某个范围内,主要通过 set 方法进行拦截报错

```js
const person = { name: "jack", age: 12 };
const handler = {
  set(obj, key, value) {
    if (key === "age") {
      if (typeof value !== "number") {
        throw new Error("age只能为数值");
      } else {
        obj[key] = value;
      }
    }
  },
};
```

3. 实现双向数据绑定

实现双向数据绑定有 2 方法，一个是 Object.defineProperty 方法，另外一个就是 Proxy

前者的缺点：

1. 无法监听数组变化
2. 只能劫持对象的属性，无法劫持一个完整对象

```js
function proxyCatch() {
  const oTxt = document.querySelector("#txt");
  const oContent = document.querySelector("#content");
  const obj = {};
  const handler = {
    get(obj, key, proxy) {
      return obj[key];
    },
    set(obj, key, value) {
      if (key === "text") {
        oTxt.value = value;
        oContent.innerText = value;
        obj[key] = value;
      }
    },
  };
  const p = new Proxy(obj, handler);
  oTxt.addEventListener(
    "keyup",
    function (e) {
      obj.text = e.target.value;
    },
    false
  );
}
```

## Reflect 对象

### 规范 Object 的部分操作

目标：形成统一规范

1. 规范 in 操作

判断对象里是否存在某个属性，语法`Reflect.has(obj,key)`

```js
const person = { name: "jack", age: 12 };
//传统
const a = "name" in person;
console.log(a); //true
//Reflect对象
const b = Reflect.has(person, "name");
console.log(b); //true
```

2. 规范 delete 操作

删除对象某一属性，语法`Reflect.deleteProperty(obj,key)`

```js
const person = { name: "jack", age: 12 };
//传统
delete person.name;
console.log(person); //{ age: 12 }
//Reflect对象
Reflect.deleteProperty(person, "name");
console.log(person); //{}
```

3. 定义一个属性

Reflect.defineProperty 和 Object.defineProperty 区别 :前者返回的是一个对象，而后者返回一个布尔值

```js
const person = {};
//传统方式
const res1 = Object.defineProperty(person, "name", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "jack",
});
console.log(res1); //{name:'jack'}
//Reflect对象
const res2 = Reflect.defineProperty(person, "name", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "jack",
});
console.log(res2); //true
```

4. 获取所有属性

获取所有属性需要 Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols 两个方法，非常不方便，而在 Reflect 中只需要一个方法

```js
const age = Symbol();
const person = {
  name: "jack",
  [age]: 12,
};
//传统方式
const res1 = Object.getOwnPropertyNames(person);
const res2 = Object.getOwnPropertySymbols(person);
//Reflect对象
const res = Reflect.ownKeys(person);
console.log(res); //["name",Symbol()]
console.log(res1); //["name"]
console.log(res2); //[Symbol()]
```

### 配合 Proxy 使用

- Reflect.get(obj,key,proxy)
- Reflect.set(obj,key,value)
- Reflect.has(obj,key)
- Reflect.deleteProperty(obj,key)
- Reflect.ownKeys(obj)

这些方法可以代替 Proxy 里对应方法的实现，比如

```js
function proxyCatch() {
  const oTxt = document.querySelector("#txt");
  const oContent = document.querySelector("#content");
  const obj = {};
  const handler = {
    get(obj, key, proxy) {
      return Reflect.get(obj, key, proxy);
    },
  };
  const p = new Proxy(obj, handler);
}
```

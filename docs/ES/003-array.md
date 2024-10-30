---
outline: deep
---

# 数组

## ES6 新增方法

### 判断是否为数组

语法：`Array.isArray(检测对象)`

ES5 实现：

```js
const res = Object.prototype.toString.call([1, 2, 3]);
if (res.indexOf("Array") !== -1) {
  //这是数组
} else {
  //这不是数组
}
```

### 创建数组

ES5 创建数组：

- 构造函数 `new Array()`
- 使用数组字面量 `[]`

缺点：当只有一个参数的时候，创建的数组拥有 len 长度，元素都为 undefined,多个参数的时候才是创建的正常元素数组

ES6 创建数组：
语法：`Array.of()`

解决了 new Array 方法的怪异行为

```js
const arr1 = Array.of(); //[]
const arr2 = Array.of(0); //[0]
const arr3 = Array.of(1); //[1]
const arr4 = Array.of(1, 2); //[1,2]
```

### 转换数组

ES6 语法：`Array.from()`
ES5 语法：`Array.prototype.slice.apply()`
:::info
类数组:字符串、函数的 arguments、DOM 的 NodeList<br/>
arguments:函数自带，表示回去函数参数，但只能在函数内部使用
:::
类数组特点：

1. 有 length 属性
2. 可以使用下标方式访问
3. 不能使用数组的其他方法，比如 push,slice,join 等

关于函数的 arguments:

```js
function fun() {
  console.log(arguments.length, arguments[0]);
}
fun(1, 2, 3, 4); //4,1
```

`Array.from()`除了可以将类数组转换为真正的数组，还可以将 Set,Map 转化为数组

### 填充数组

语法：`arr.fill(val,start,end)`

该方法会改变原数组；如果当前位置有值，则该值会被覆盖,被修改位置不包含 end。如果 end 大于数组长度，则只会填充长度以内的位置

```js
const arr = [1, 2, 3];
const c = arr.fill(4, 0, 2);
console.log(c, arr); //[4,4,3],[4,4,3]
```

### 打平数组

又名数组扁平化，将多维数组转换为一维数组

语法：`arr.flat(number/Infinity)`

参数表示打平的层数，默认值为 1，Infinity 表示不管有多少层嵌套，都转化为一维数组。一般情况下用 Infinity 较多。

ES5 中如何实现数组扁平化？？

::: code-group

```js[递归]
function flatArr1(arr){
    var resArr=[]
    arr.forEach(function(item){
        var str=Object.prototype.toString.call(item)
        if(str.indexOf("Array")!==-1){
            resArr=resArr.concat(flatArr1(item))
        }else{
            resArr=resArr.concat(item)
        }
    })
    return resArr
}
```

```js[toString]
//不适用于undefined或者null等
function flatArr2(arr){
    let tempArr=arr.toString().split(',')
    let resArr=tempArr.map(function(item){
        return item
    })
    return resArr
}
```

```js[join]
function flatArr3(arr){
    let tempArr=arr.join().split(',')
    let resArr=tempArr.map(function(item){
        return item
    })
    return resArr
}
```

:::
数组元素的类型不确定，则优先使用递归实现

### 判断元素

语法：`arr.includes(val,index)`

index 参数默认为 0，表示从哪个元素下标开始查找

:::tip
indexOf()和 includes()都是用来判断 数组中是否存在某个值 ，find()用于判断 数组中是否存在符合条件的值
:::

### 查找元素

#### find

作用：查找数组中符合条件的元素
语法：

```js
arr.find(function (val, index, array) {});
```

如果有符合条件的元素则返回第一个符合条件的元素，否则返回 undefined

#### findIndex

作用：查找数组中符合条件的元素位置
语法：

```js
arr.findIndex(function (val, index, array) {});
```

如果有符合条件的元素则返回第一个符合条件的元素位置，否则返回-1

ES5 中有`IndexOf()`和`lastIndexOf()`用于查找元素，局限性在于只能查找 **和某个值匹配** 的元素，而不能查找 **符合某个条件的** 元素

### every&some

```js
arr.every(function (val, index, array) {});
arr.some(function (val, index, array) {});
```

every：用于判断数组中所有元素是否都满足某个条件，如果都满足则返回 true，否则 false

some:用于判断数组中是否存在一个元素满足某个条件，如果都不满足则返回 false，只要有一个满足就会返回 true

:::warning
在前后端交互中可能会遇到空数组，如果对空数组进行判断，则 every 永远返回 true，some 永远返回 false。
:::

### 遍历数组

常规：for 循环，forEach 方法

以下 3 种方法都会返回一个 Iterator 对象，所以后续都可以使用 for...of 循环来遍历

1. arr.keys():遍历数组的 key（元素的索引）
2. arr.values():遍历数组的值（元素的值）
3. arr.entries():同时遍历数组的 key 和 value

```js
const arr = [1, 2, 3];
for (let key of arr.keys()) {
  console.log(key); //0，1，2
}
for (let val of arr.values()) {
  console.log(val); //1，2，3
}
for (let entry of arr.entries()) {
  console.log(entry); //[0,1],[1,2],[2,3]
}
```

## 字符串和数组的共同方法

| 方法        |
| ----------- |
| indexOf     |
| lastIndexOf |
| includes    |
| slice       |
| concat      |
| toString    |
| valueOf     |

> slice 方法钟，截取范围为`[start,end)`,

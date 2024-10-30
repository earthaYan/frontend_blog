---
outline: deep
---

# 字符串

## ES6 新增方法

### 检索类

均返回布尔值

| 方法         |         说明         | 使用示例              | 参数说明                  |
| ------------ | :------------------: | --------------------- | ------------------------- |
| includes()   |  是否包含某个字符串  | A.includes(B,index)   | 从第 index 个字符开始查找 |
| startsWith() | 是否以某个字符串开头 | A.startsWith(B,index) | 从第 index 个字符开始查找 |
| endsWith()   | 是否以某个字符串结尾 | A.endsWith(B,index)   | 对前 index 字符进行查找   |

::: info
B：需要被包含的子字符串;index：检索的位置,可省略
:::

```js
var a = "hello jae";
var b = a.includes("jae"); //true
var b = a.includes("jae", 7); //false
var c = a.startsWith("jae", 6); //true
var d = a.endsWith("jae", 2); //false
var d = a.endsWith("jae", 7); //true
console.log(d);
```

### 重复类

返回重复后的字符串,不改变原字符串

| 方法     |         说明         | 使用示例      | 参数说明         |
| -------- | :------------------: | ------------- | ---------------- |
| repeat() | 对某个字符串进行重复 | A.repeat(num) | num 为重复的次数 |

```js
var a = "hello jae";
var c = a.repeat(2);
console.log(a, c); //"hello jae", "hello jaehello jae"
```

### 去除空白

返回去除空格后的字符串

| 方法        |     说明     | 使用示例        |
| ----------- | :----------: | --------------- |
| trim()      | 去除首尾空格 | str.trim()      |
| trimStart() |  去除首空格  | str.trimStart() |
| trimEnd()   |  去除尾空格  | str.trimEnd()   |

场景：

1. 前后端交互时用于去除后端传过来的数据中的空格，获取到准确的数据
2. 做验证码校验，去掉用户输入的字符串的首尾空格，再传给后端

### 长度补全

如果字符串的长度没有达到指定长度，则在头部或者尾部进行补全。
如果第 2 个参数省略，则默认用空格填充

| 方法       |      说明      | 使用示例              |
| ---------- | :------------: | --------------------- |
| padStart() | 在开头进行填充 | str.padStart(len,str) |
| padEnd()   | 在结尾进行填充 | str.padEnd(len,str)   |

使用场景：处理时间日期格式化,倒计时效果
::: code-group

```js[传统处理]
const d=new Date()
const year=d.getFullYear()
const month=d.getMonth()+1
const day=d.getDate()
//处理月数
if(month.toString().length<2){
    month='0'+month
}
//处理日期
if(day.toString().length<2){
    day='0'+day
}
const time=year+'-'+month+'-'+day
```

```js[使用长度补全处理]
const d=new Date()
const year=d.getFullYear()
const month=(d.getMonth()+1).toString().padStart(2,'0')
const day=d.getDate().toString().padStart(2,'0')
const time=year+'-'+month+'-'+day
```

:::

## 模板字符串

语法:使用反引号

```js
const time = `${year}-${month}-${day}`;
```

作用：

- 多行字符串：
- 字符串拼接：可保留格式，如缩进、换行等

:::tip
模板字符串中，单引号和双引号可以不需要转义直接保留下来，
:::

---
outline: deep
---

# 运算符

## 展开运算符

作用：将一个数组或对象展开为以逗号隔开值列表，也可以用于实现浅拷贝

语法：`...arr`,`...arr`位于等号的左边

### 使用场景

1. 合并数组:`[...arr1,...arr2]`
2. 合并对象:`{...obj1,...obj2}`
3. 将类数组转换为数组：`const args=[...arguments]`
4. Math.max()和 Math.min():`Math.max(...arr)`
5. 往数组中添加元素:`const res1=[a,...arr2]`

## 剩余运算符

`...`位于等号的右边

作用：

1. 解构赋值

```js
const person = {
  name: "jack",
  age: 23,
  gender: "male",
};
const { age, ...msg } = person;
console.log(msg); //{name:'jack',gender:'male'}

const arr = ["1", "2", "3"];
const [arg1, ...arg2] = arr;
console.log(arg1); //1
console.log(arg2); //['2','3']
```

2. 处理 arguments

将函数的参数处理为一个数组

```js
function fn(...args) {
  console.log(args); //[1,2,3]
}
function fn() {
  const args = [...arguments];
  console.log(args); //[1,2,3]
}
fn(1, 2, 3);
```

## 求幂运算符

语法：`a**b`，与等于 a^b

# 《你不知道的javascript 上》

### this 指针

两大误区：

#### 1.this 指向函数自身

```js
function foo(num) {
	console.log("foo****" + num)
	this.count++;
}
foo.count = 0;

for (var i = 0; i < 10; i++) {
	if(i > 5)  {
		foo.(i)

	}
}

console.log(foo.count) // 0
```

#### 2.this 指向函数的作用域

```js

'use strict';

function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log(this.a)
}

foo(); // Uncaught TypeError: Cannot read property 'bar' of undefined

```
试图共享作用域是不可行的

##### 敲黑板画重点：
	this 是在函数调用时被绑定的，所以和函数的声明位置没有关系，只取决于函数被调用的位置 

### this 的隐式绑定

#### 1.对象属性引用链上只有最后一层在调用位置中起到作用

```js
function foo() {
	console.log(this.a)
}

var obj1 = {
	a: 42,
	foo: foo
}

var obj2 = {
	a: 2,
	obj1: obj1
}

obj2.obj1.foo() // 42
```

#### 2.this 中常见的会隐式丢失绑定对象，也就是说 this 可能会指向全局对象或者 undefined,取决于是否是严格模式

```js
// 第一种
function foo() {
	console.log(this.a)
}

var obj = {
	a: 42,
	foo: foo
}

var bar = obj.foo;
var a = "hello world";

bar() // "hello world"

// 第二种
function foo() {
	console.log(this.a)
}

function doFoo(fn) {
	fn();
}

var obj = {
	a: 42,
	foo: foo
}

var a = "hello world";

doFoo(obj.foo) // "hello world"

// 想要输出42
function doFoo(fn) {
	fn.call(obj)
}

```

####  严格模式和非严格模式不能混用，对于使用的第三方库包含严格模式的话，做好兼容

### 3.this 中的显示绑定

#### 3.1 硬绑定，通过在嵌套函数中执行 call()或者apply()改变this的指向。

```js

function foo(something) {
	console.log(this.a, something)
	return this.a + something
} 

var obj = {
	a:2
}

var bar = function() {
	return foo.apply(obj, arguments)
}

var b = bar(3)   // 2 3
console.log(b)

```

#### 3.2 new 绑定，通过调用构造函数，若函数没有其他返回对象，会返回这个对象

```js

 function foo() {
	this.a = 3
 }

 var a = 4;
 var bar = new foo(2)
 console.log(bar.a)   // 3


```
### 4.箭头函数this

只根据当前的此法作用域决定，只和上一层函数作用域有关

```js
function foo() {
	return (a) => {
		console.log(this.a)
	}
}

var obj1 = {
	a:2
}

var obj2 = {
	a:3
}

var bar = foo.call(obj1) 
bar.call(obj2)  // 2  与bar无关 只与foo有关

```

## 对象

1. 不知道的区别

```js

var a = Object.create(null)  // 效果一样 但是a不会创建原型prototype

var b = {}


```


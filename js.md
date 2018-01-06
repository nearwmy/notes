# 《你不知道的javascript 上》

## this 指针

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

### 1.不知道的区别

```js

var a = Object.create(null)  // 效果一样 但是a不会创建原型prototype

var b = {}


```

### 2.用.操作符和 []操作符访问对象属性的区别

- .操作符的命名规范要弱于[]操作符，比如需要访问一个‘Super-Fun!’的属性就必须用到 ['Super-Fun!'],而 .操错符中这不是一个有效的属性名。

- 点操作符一般用于访问静态对象，中括号一般用于访问动态对象，括号内可放变量

[好文参考 细说JavaScript中对象的属性和方法 － 颜海镜](http://yanhaijing.com/javascript/2015/05/08/member-of-object/)


### 3.数组也是对象，数组是特殊的对象，属性名称为下标值，只能为非负整数。

```js
var a = ['1','2','3'];

a.length                    // 3
a.info = 'baz'; 
a                           // 仍是对象，可以创建属性 ["1", "2", "3", info: "baz"]
a.length                    // 长度不会改变 3
a['3'] = '4'                // 传入数字字符串会自动转换为下标值
a                           // ["1", "2", "3", "4"]

```

### 4.复制对象

看似简单的操作实际上处理起来很复杂，这里就需要考虑到需要复制的程度。因此引入浅复制和深复制概念。

#### 浅复制：复制出来的对象和旧对象都指向同一块内存地址，所以当某一个对象属性发生改变时，都会影响到另一个复制对象的值

#### 深复制：重新开辟一块内存地址，新旧对象的属性值改变互不影响


浅复制的实现

a.简单的引用

```js
var obj1 = {
	a:'1',
	b:['1','2','3'],
	c:{
		d:'e'
	}
}

var obj2 = obj1;

console.log(obj2.b === obj1.b)     // true

```
b.Object.assign(), 可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

```js
var obj1 = {
	a:'1',
	b:['1','2','3'],
	c:{
		d:'e'
	}
}
var obj2 = Object.assign({}, obj1);
console.log(obj2.c.d === obj1.c.d);     // true

```
c.Array.slice() 和 Array.concat()

```js
var array = ['1','2','3'];
var array_a = array.slice(0);
var array_b = array.concat();

console.log(array === array_a)     // false  看起来不是浅复制
console.log(array === array_b)     // false  看起来不是浅复制

array_a[0] = 'a';

console.log(array)                 // ["a", 2, 3]
console.log(array_a)               // ["a", 2, 3]

```

深复制的实现

a.JSON对象的parse和stringify

JSON对象是ES5中引入的新的类型（支持的浏览器为IE8+），JSON对象parse方法可以将JSON字符串反序列化成JS对象，stringify方法可以将JS对象序列化成JSON字符串，借助这两个方法，也可以实现对象的深拷贝。

```js

//例1
var source = { name:"source", child:{ name:"child" } } 
var target = JSON.parse(JSON.stringify(source));
target.name = "target";  //改变target的name属性
console.log(source.name); //source 
console.log(target.name); //target
target.child.name = "target child"; //改变target的child 
console.log(source.child.name); //child 
console.log(target.child.name); //target child\

//例2
var source = { name:function(){console.log(1);}, child:{ name:"child" } } 
var target = JSON.parse(JSON.stringify(source));
console.log(target.name); //undefined

//例3
var source = { name:function(){console.log(1);}, child:new RegExp("e") }
var target = JSON.parse(JSON.stringify(source));
console.log(target.name); //undefined
console.log(target.child); //Object {}

```
此方法能满足一般的对象深拷贝需求，而且方法简单。但是有以下不足：
- 对于存在json数据无法表示的数据类型，比如数组或函数或正则表达式，无法满足直接丢失值
- 对于存在引用对象时无法满足
- 如果是构造函数，会丢失constructor，深复制之后变成普通的object

b.参考jQuery的extend

### 5.对象的存在性

在访问对象返回undefined时，存在两种情况：
1.此属性存在，值就是undefined
2.此属性不存在， 如何区分这两种情况呢？

#### for in 
for in 能查找此对象以及原型链上的属性，此方法针对数组无效，for in 说到底就是根据属性名访问对象属性

```js

var a = [1,2,3]

3 in a  //并不会返回true， 此时访问的是a[3] undefined

```

#### hasOwnProperty
只能查找该对象是否存在其属性

### 6.对象的可枚举性

可枚举性enumerable，相当于属性存在，但是在对象遍历中不会被访问到 例如for in,那么要验证该属性是否enumerable的方法有哪些呢？
- for in 肯定是一种，enumerable为false时，不会被遍历到
- Object.keys(myObjects),返回可枚举的属性数组，（只访问当前对象，不访问protoType）
- myObjects.propertyIsEnumerable("a"),判断当前属性是否可枚举，（只访问当前对象，不访问protoType）


## 多态

## Prototype

作用：
对象的属性查找会先触发get操作，本对象不包含则会触发object.prototype，查找原型链。原型链的尽头则会指向内置的Object.prototype.关于内置的存在哪些属性，包含toString() valueOf()等等

注意：js就是一门面向对象的语言，根本不存在“类”,然而我们喜欢写成伪类函数，其实其中就利用了prototype属性。将一个对象与另一个对象关联起来。能产生这种关联的方法有很多：
	1. new 操作符实例化对象
	2. object.create(obj)

### 属性设置

#### 给对象设置属性时发生了什么

首先给对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值。

	比如： myObjet.a = "bar"

如果该对象上本身存在此属性，并且可修改,会修改此属性值。这是最简单的模式，但是并不止这一种模式；如果a属性不存在本身对象上，会根据原型链查找与之关联的对象，也就是说 prototype 链 会被遍历。如果链上找不到此属性，才会被直接添加到myObject对象上。

### 属性屏蔽

上面讲到如果属性不存在于原型链上的情况，下面介绍下当属性存在于原型链上时。

1. 如果原型链上存在a属性，本身对象也存在a属性，这时会发生**属性屏蔽**，也就是myObject.a访问到的只能是原型链最底层的a属性。
2. 如果原型链上存在a属性，本身对象不存在。这时的情况比较复杂，可分为三种：
	*	如果在原型链上a属性为普通属性，并且没有被标记为只读（writeable：false），那么会在myObject对象上直接创建的一个新的a属性，这个叫做**屏蔽属性**。
	*	如果a属性存在于原型链并标记为只读，那么它就是无法修改或者创建屏蔽属性的。如果是严格模式下，代码还会报错。总之，不会发生屏蔽。
	* 如果a属性存在于原型链并是一个setter,(当setter存在时，js会忽略它们的value和writeable特性)，会调用setter，这时a属性不会被添加到myObject对象上，也不会重新定义a这个setter （不会被重新定义 不懂）

### ES5 新增数组方法

forEach: 参数依次为: index,item,array,forEach不会遍历纯粹“占着官位吃空饷”的元素的

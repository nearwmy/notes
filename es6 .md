## es6 学习

1. 基本数据类型： String Number Boolean Null Undefined Symbol 
	引用类型： Object
2. Iterator 遍历器
	- 是一个对象，提供next方法用来返回序列中的下一项，返回的属性包括done 和 value
	- 内置可迭代对象：Map String Array TypedArray Set 函数的arguments 属性和 NodeList 对象,因为他们的原型对象上都有一个 Symbol.iterator 方法
	- 只有具备 Symbol.iterator 属性才能被 for of 循环遍历
	- 普通对象部署数组的 Symbol.iterator 属性并没有效果
3. 箭头函数
	并不是所有的地方都适用箭头函数。

4. 字符串的扩展
	- 扩大了 unicode的读取范围，需要如下读取：'\u{20BB7}',将码点放入中括号内
	- `at()` 对于`charAt()`的扩展，可识别 Unicode 编号大于0xFFFF的字符
	- `includes(value, n)` 是否包含字符value，如果传递n表示从第n个位置开始知道字符串结束
	- `startsWith(value, n)` 同上
	- `endsWith(value, n)` 表示前n个字符
	- `padStart` `padEnd` 补全字符串，常用来为数值补全指定位数或者提示字符串格式
	- 模板字符串，所有空格和缩进都会被保留在输出之中

5. for...of 的优点
	- 字符串上可以识别大于0xFFFF的码点，传统的for循环无法识别

6. 正则的扩展
	- 添加 u 修饰符 `/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true`  
	-  y 修饰符 **不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。**
7. 数值的扩展 Number 对象
	- Number.isFinite() 数值是否有限
	- parseInt parseFloat 移到Number对象上，逐渐减少全局性方法
	- 对 Math 对象的扩展，Math.trunc() 去除小数点部分， Math.sign() 判断一个数是否是正数 负数 或者 -+ 0 或者 NaN
8. 数值 Math 对象 的扩展 常用的
	- `Math.trunc()` 去除小数部分
	- `Math.sign()` 判断是否是正数 负数 -0 +0 NaN
	- `**` 指数运算符，和等号可以搭配使用 	`**=` 意思和`Math.pow()` 是一样的，但是在 V8 引擎中，指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异
9. 函数的扩展
	- 函数不能设置默认值，只能通过变通 || 的方法设置，es6 允许设置函数默认值
	- 参数变量是默认声明的，所以不能用let或const再次声明。
	- 参数默认值是惰性求值,每次调用函数都会重新计算，而不是一旦被赋值就默认
	- 函数的 `length` 属性，返回没有指定函数默认值参数的个数，设置了默认值之后,length将失真，如果设置的默认值非尾部参数，length将不再计入之后的参数
10. async 函数
 - 返回一个 Promise 对象，可以在之后调用 then 方法执行回调
 - 内部存在 await 命令时，必须等到所有 await 的 Promise 执行之后，才会执行本身的回到函数
 - 如果第一个 await 返回 reject, 第二个 await 就不会执行了，为了避免此情况，可以将可能返回 reject 的 await 放在 try catch 中或者 在 此 await 方法后跟一个 catch 方法
 - 多个 await 写成继发关系模式

```
// 写法一
let [foo, bar] = async Promise.all([getFoo(), getBar()]);

// 写法二
 

```
- await 命令只能用在 async 函数中，普通函数会报错

11. Symbol 
	- 表示独一无二的值
	- 相同参数的函数返回值不相等	
	
	```
	let foo = Symbol()
	let bar = Symbol()
	foo === bar // false
	
	let foo = Symbol('foo')
	let bar = Symbol('foo')
		
	foo === bar  // false
	```
	
	- 不能和其他类型的值进行运算
	- 可以显示转为字符串，并且可以转为布尔值，但不能转为数值
	- 作为属性名时不能用点运算符赋值，必须用中括号
	- 作为属性名时改属性为公开属性，不是私有属性 ？？
	- Symbol 作为属性名不会被 for...in for...of 遍历，也不会被Object.keys() Object.getOwnPropertyNames() JSON.stringify() 返回。
	- Object.getOwnPropertySymbols() 返回当前对象包含的所有Symbol 属性名的一个数组
	- Symbol.for('foo') 寻找是否存在此参数的Symbol的值，有就返回没有就新建
	- Symbol.keyFor('foo') 返回已登记的 Symbol 类型值的 key，否则就是 undefined
	- 内置方法 
12. Set 和 Map
	- Set 不会添加重复的值
	- NaN 在内部被视为相同的值，但是两个相同的对象被视为不同的值
	- 通过new Set().entries() 返回含有键名和键值的数组，键名和键值永远都是一样的
	- set 数组可通过 for of 和 forEach 和 ... (扩展运算符)遍历
	- 目前没有直接同步更改原 Set 结构的方法，但是可以通过对旧值重新赋值的方法实现 提供两种方法 `new Set(array)` 或者 `new Set(Array.from(set, val => val * 2))`
	- WeakSet 和 set 的区别就是只存放对象，并且一旦不被引用就会被垃圾回收机制回收，里面的成员都是弱引用，随时会消失，不适合引用，也正是因为随时会消失，所以 es6 规定不能被遍历。
	- map 解决键值可以是对象的问题。通过set 赋值，通过get 取值
	- map 中对同一个键多次赋值，最后一个会覆盖前面的值
	- map 的键值和内存地址绑定，所以只有完全相同的对象才会返回同一个值 
	```
	0 === -0    // true
	'true' === true // false
	undefined === null // false
	NaN === NaN // true
	```
	
	- map 方法 `size set(key, value) get(key) has(key) delete(key) clear()`
	- Map 结构本身没有 map filter 方法，需要转换为数组才有
	- Map 结构转换为数组:扩展运算符 ... [...Map] 
	- 数组转为 Map: new Map(arr) 
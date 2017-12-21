1. 判断原生滚动还是div区域滚动

```js
 var originScroll = false;

 window.addEventListener('scroll', function(){
		originScroll = true;
 })

 ```

 2. js中的模拟事件

 js中的事件很多，大致可分为UI事件（UIEvents),一般化的鼠标事件（MouseEvents）,DOM的变动事件（MutationEvents）,html事件（HTMLEvents）,一般事件都是用户触发的，但是不一般的情况下或者说应该对得上js无所不能称号的前提下，能生成就能自己触发。在测试和需要主动触发的情况下，这个方法就很给力了。

 一般分为三个步骤：

 a: 创建event事件对象，通过document.createEvent(type, bubbles, cancelable,...),此方法接受15个参数，一般就觉得前三个比较常用。

 b: 初始化事件对象，eventObj.inieEvent()

 c: 触发事件对象target.dispatchEvent()

```js
function trriger(el, type, bubbles, cancelable) {

	var event = document.createEvent('Events');

	event.initEvent(type);

	el.dispatchEvent(event)
}
```
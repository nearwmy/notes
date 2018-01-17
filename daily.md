## 日常总结

* [判断原生滚动还是div区域滚动](#判断原生滚动还是div区域滚动)
* [js中的模拟事件](#js中的模拟事件)
* [移动设备API支持说明](#移动设备API支持说明)
* [WebVR](#WebVR)
* [图片资源选择](#图片资源选择)
* [图像压缩与合并的几点感悟](#图像压缩与合并的几点感悟)
* [RESTful API](#RESTful API)



判断原生滚动还是div区域滚动
------

```js
 var originScroll = false;

 window.addEventListener('scroll', function(){
		originScroll = true;
 })

 ```

js中的模拟事件
------

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

移动设备API支持说明
------

- **视频 video**: 
	- iOS10以上不支持autoplay 和 preload ，iOS引入新属性 'playsinline'，此属性可以支持自动播放，前提是视频没有声音;
	- preload 属性是 ios上基于对用户流量控制的考虑完全不支持，安卓手机部分支持（浏览器厂商的实现标准不一样）;
	- poster 属性 在 ios 上支持，部分安卓浏览器不支持此属性。可通过前端css 和 js 来统一这个问题。

- **音频 audio**: 情况同上，基于流量控制会被ios禁止，安卓部分支持

- **媒体流（getUserMedia）**: 相机，屏幕共享，或者麦克风等等
	```js
	navigator.getUserMedia(constraints, successCallback, errorCallback)
	```
- **语音识别 web speech**: 相关 api 分为3个部分：
	- SpeechRecognition 对象 实现语音识别
	- SpeechSynthesis 对象 实现文本转语音合成
	- SpeechGrammar 对象 实现自定义语法创建

	支持效果：目前移动版的chrome支持比较完整，ios只支持 “文本转语音合成” 的部分API, android 5.0+ 只支持 SpeechSynthesis

- **Web Audio 节点**，可以用于分析处理音频，如混音和过滤，不仅仅是播放音频。

	要求系统版本为ios 6+ 和 android 4.4+

- **地理定位 Geolocation API**, 用于将用户当前地理位置信息共享给信任的站点.
	- 位置信息来源包括： GPS IP地址 RFID WI-FI 蓝牙的MAC地址 GSM/CDMS的ID等。 
	-	这些信息来源并没有先后顺序.
	-	测试表示移动网络环境会比wifi 环境更准确

	支持效果：ios 6.0 + Android 2.3+,ios 会弹出用户定位授权框，并且ios10 以上需要https协议才能使用Geolocation API

- **设备震动 Vibration API** 目前处于 W3C 标准的建议阶段，支持的效果不是很好，适当了解就行。

- **电池状态 Battery API** 可以获取用户设备的电池状态信息，支持也不是很理想。
	```js
		//属性
		battery.level   // num 0-1 显示电池电量
		battery.dischargingTime   // num 电池完全放电直到系统休眠剩余时间
		barrery.chargingTime   // num 电池完全充满电量所需时间
		battery.charging       // boolean 系统当前是否正在充电
	```
- **环境光 Ambient Light**，可提供周围光亮程度的信息，通常由设备的光感应器提供信息

- **网络信息 Network**，获取移动设备的网络信息。

	- navigator.onLine / navigator.offLine，用户是否在线。支持效果： ios 8.4+ android4.3+
	- navigator.connection 事件，返回网络状态相应信息


WebVR
------

- Firefox 和 Google 已相继对VR API 进行支持,两家公司联合创建 WebVR 标准
- MozVR团队推出开源框架 A-Frame，能通过html标签创建VR网页，不过此框架仅适用于简单的场景，基于threeJS 封装，能快速搭建VR网页。学习成本较低。
- A-Frame的提升：threeJS + WebVR 组件，优点是基于此能完成复杂的场景，缺点是学习成本过高
- 已存在基于普通浏览器实现的组件：webvr-polyfill，并且不依赖特定浏览器，引入此js即可


图片资源选择
------

前端优化必不可少的环节，并且图片在网页中占比越来越高，对他们做越好的处理，会让你的页面加速越多。对其做优化之前，我们首先得了解图片。常用的图片格式包括：JPEG GIF PNG SVG，下面分别详细介绍一下：

**图片质量上：**

- JPEG 分为 baseline-jpeg 和 preogressive-jpeg，两者的区别在于前者的图型数据按照存储从上而下的顺序显示，也就是在网络比较差或者文件较大的情况下读取时，你会看到图片一行一行的显示出来，而后者属于扫描式多次存储，打开此类图片时，先显示模糊的图像，在逐渐增加清晰度，直到加载完毕。在网页中，建议优先使用后者格式的图片。
- GIF 分为静态图和动态图，最多支持256色，可用于显示动图

- PNG 分为 PNG8 PNG24 PNG32。
	- PNG8 支持索引色透明以及ALPHA通道半透明，最多支持256色；
	- PNG24 支持真彩色，不支持透明
	- PNG832 支持真彩色和透明
- SVG 矢量图，通过xml格式存储矢量图形，可支持不同平台的缩放 控制 css优化等等，比较适用于动画

**文件大小上：**

从左到右：JPEG < GIF < SVG < PNG8 < PNG24 < PNG32

**适用场景上：**

- JPEG 适用于色彩丰富，复杂的静态图片，其生成文件较小
- GIF 适用于简单色彩度不高的动态图片，相比 svg 制作简单
- PNG 根据对透明度和色彩度的要求选择相应格式，生成文件较大，可以利用压缩工具辅助完成
- SVG 适用于对图形元素有操作要求的动画图像以及要求是矢量图形的

图像压缩与合并的几点感悟
--------

- 图片过大时，考虑压缩，压缩工具：jpegtran for jpeg, PNGoo for png
- 合并图片，以此来减少http请求数量
	1. 过于复杂的图片不适合合并，合并主要针对图标和按钮之类的小元素
	2. logo 建议单独放置
	3. 移动端上的图标大多含有 ALPHA 通道的 PNG 图片，为了控制文件大小和显示效果，建议将颜色近的值放在一起，并注意空白间隔无需太大，减少设备的占用内存
	4. 雪碧图建议手工合成,这样的优化度最高。

RESTful API
--------

Resource Representational State Transfer 表现层状态转移，一种后端设计api的规范。

达到的效果： 看Url就知道要什么
	 		 		 看http method就知道干什么
      		 看http status  code就知道结果如何
      		 
我自己的理解：

  1. 面向资源，URI请求就能反映出需要获取什么资源
  2. 规范请求方法：
			* get: 从服务器获取资源  
			* post: 创建新资源或者更新资源    
		  * put: 更新服务器资源（需要提供完整的更新资源数据）  
			* delete: 删除服务器资源  
			* patch: 更新服务器资源 （只需提供需要更新的资源数据)
	3. URI: 每个uri对应一个资源请求
	4. 无状态：不依赖其他资源和操作步骤

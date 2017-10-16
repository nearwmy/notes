### 《css 揭秘》

#### css 编码技巧

1. 某些值相互依赖，应该把它们的相互关系用代码表达出来.比如：

```
// 绝对值的方式
font-size:20px;
line-height:30px;
 	
// 表明相互关系
font-size:20px;
line-height:1.5;

//需要注意的是：明白希望相互依赖的样式和需要固定的样式，不要盲目选择依赖;
```
	


2.代码易维护 vs 代码量少不可兼得,比如：

```
// 左侧不加边框，一行代码
border-width:10px 10px 10px 0;
    
// 易维护，两行代码
border-width:10px;
border-left-width:0;
```


## 可直接拖进项目运行

## QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

---
## 作者想说
二维码生成参考了 `诗小柒` 的二维码生成器， 感谢 `诗小柒`!
也感谢qq：1846492969 的帮助

如果该插件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)\*✲ﾟ\*  蟹蟹~拜托啦~

---
## 组件简介
一款自我感觉良好、实用的海报生成器

---

# 警告
`小程序中请注意自己的获取图片信息的api--getImageInfo 是否正常获取图片信息，否则绘制不出来`
<br />
H5不支持本地存储机制

## `目前请使用网络图片!`

# 兼容性
### APP、微信小程序、H5

#  更新说明

| 版本号| 更新说明|
| --------- | -------- |
| v3.0.1| 1.drawArray类型项内属性新增`allInfoCallback`属性，可以获取drawArray绘制序列全部的详细信息, 并相应新增serialNum属性用于控制顺序, 详见[2.0.8 drawArray参数详解](#drawArray), 示例在示例项目中绘制的第二段文字 <br /> 2.新增属性formData，用于app.js中的获取背景图方法的携带数据 <br />3.image类型新增alpha参数用于控制透明度[0, 1]|
| v3.0.0| 1.版本号更改为3.0.0开始<br />2.新增`可控层级绘制序列-drawArray`, 建议使用该序列绘制, 该属性可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报 详见2. <br />3.新增 delayTimeScale(生成图片时延时系数)、 drawDelayTime(draw方法延时时间)等属性，控制延时, 详见2. <br />4.`注意`, 引入js写法改成 `import { getSharePoster } from '@/util/QS-SharePoster/QS-SharePoster.js';`<br />5.新增_this属性，组件中使用时必传,详见2.<br />6.修复有时绘制圆形或矩形圆角图片不生效问题|
| ...| [`查看历次更新`](#oldUpdate) |

# 示例代码请下载示例项目查看

#  1. 使用说明
## 1.0.0画布相关
```
首先目前有两种方式, 根据背景图绘制和自定义画布绘制,
1、根据背景图绘制
	该方式中画布大小跟随背景图大小，而背景图的设置有两种方式:
		a、app.js中的getPosterUrl方法获取 (若采用此方法则需自行配置)
		b、传参backgroundImage为图片地址
2、自定义画布绘制
	该方式需传background属性, 根据其属性控制画布的大小颜色
```
## 1.0.1布局相关
```
因为ios的原因会将画布大小进行默认0.75的缩放(目前不知道原因), 可以手动设置bgScale参数控制比例
故绘制时各项参数若不是通过bgObj(背景对象, 包含画布宽高等参数) 动态控制的 则应该乘以bgScale参数
```
## 1.0.2其他
```
注意：其实该插件主要使用的其中的js， 至于图片展示问题其实是开发者自行实现的

使用步骤
1、在需使用的vue页面中`创建一个canvas`，并自定义id，该id需传入js方法中，并`动态绑定宽高`
2、引入QS-SharePoster.js，该js文件导出一个对象,使用该对象中的getSharePoster方法
3、使用getSharePoster方法。 该方法`接收一个对象`，并返回一个`Promise对象`，在页面中可以使用async、await的方式，也可以用then方法, `该方法最终返回绘制好的海报临时路径`

注意: 若没有自行控制画布宽高，则应该设置setCanvasWH方法并设置画布宽高

本地存储机制: 背景图从后端获取后会以‘/’字符分割后的最后一位为name，QS-SharePoster会判断此name是不是和本地相同，若不同则从后端获取重新生成，若相同则使用本地路径，name判断通过后，还会判断图片宽高信息，不通过则重新获取，所以， 若后端需换背景图，则将新上传的图片命名不要相同与前一次, 或宽高不同于前一次即可

```

# 2. 传入参数详解

`注：所有传入的图片路径可以是网络路径也可以是本地路径, 本地图片与网络图片的区分是以图片路径字符串substring(0, 4)是否为http来判断的`

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| posterCanvasId | 是 |  String |  | 页面中绘制海报的画布的id |
| type |   | all|    |   自定义标识，用于逻辑判断 |
| backgroundImage |  | String |  | 背景图片路径，优先级大于app.js中getPosterUrl方法返回的路径，`一般不建议使用` |
| reserve| | Boolean | false | 本次绘制是否接着上一次绘制 |
| qrCodeArray| | Array \| Function| | 需绘制的二维码数组，若传入的类型为Function，则可以接收一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 且必须return一个数组，推荐传入Function类型, `详见2.0.1`|
| imagesArray| | Array \| Function | |需绘制的图片数组，若传入的类型为Function，则可以接收一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 且必须return一个数组，推荐传入Function类型,`详见2.0.2` |
| setCanvasWH| （一般来说）是| Function | | 动态设置画布宽高的方法，该方法返回一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 可以根据背景图给画布定宽高，`详见2.0.3` |
| setCanvasToTempFilePath| | Function  | | 设置绘制完毕后的生成海报临时路径参数,该参数有默认, 一般可以不用填, `详见 2.0.4`|
| setDraw| | Function | | 自定义绘制方法，该方法接收一个对象, `详见 2.0.5` |
| background| | Object| | 背景图对象, `详见 2.0.6` |
| textArray| |  Array \| Function| | 需绘制的文本数组，若传入的类型为Function，则可以接收两个参数，第一个参数是背景图片的宽高等信息，第二个参数为自定义标识type ， 且必须return一个数组，推荐传入Function类型, `详见 2.0.7` |
| bgScale(v14.0新增)| |  Number | 0.75| 为了IOS能正常绘制对背景图进行缩放，取值(0,1)， 若IOS还是绘制不出可以 尝试下调此参数 |
| Context(v17.0新增)| |  CanvasContext| | 画布对象，一般不用 |
| `v3.0.0更新` | |  | |   `v3.0.0开始推荐使用drawArray绘制, 不需要再用其他的xxxArray绘制了`|
| drawArray| | Array \| Function| | 可控层级的绘制序列, 层级的顺序就是数组的顺序, 可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报, 详见[2.0.8](#drawArray) |
| delayTimeScale| | Number| 15| 根据绘制序列每一项延时该参数的时间 |
| drawDelayTime| | Number| 100| draw方法延时时间|
| _this| | Vue | | 传入当前vue实例this指向, 组件中使用时必传|
| `v3.0.1更新` | |  | |   |
| formData| | Any | | app.js中的getPosterUrl方法可获得该属性 用于获取背景图时携带的自定义数据|

## 2.0.8 drawArray参数详解<span id="drawArray" />
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`， 也允许返回promise对象
数组中的项内属性: 
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| `v3.0.1更新` | |  | |   |
| allInfoCallback | | Function|  | 该参数传入一个方法，该方法接收一个对象，该对象目前包含一个drawArray属性, 可以获取全部的drawArray的详细参数, 该方法可以return一个对象或promise对象，最终输出一个对象, 该对象的属性将会覆盖原属性|
| serialNum| | Number|  -∞| 用于控制序列中allInfoCallback的顺序, 数值越小, 越先获取|
| `over` | |  | |   |
| type| 是| String|  | 绘制类型, 可选值 'text'、'image'、'qrcode'、'custom'|
| `type为text时`| | |  |  |
|... | | |  | 参数详见[`textArray`](#textArray) |
| `type为image时`| | |  |  |
|... | | |  | 参数详见[`imagesArray`](#imagesArray) |
| `type为qrcode时`| | |  |  |
|... | | |  | 参数详见[`qrcodeArray`](#qrcodeArray) |
| `type为custom时`| | |  |  |
| setDraw| | |  | 该属性传入一个方法，接收一个参数-画布对象，可在方法中自定义绘制内容|

## 2.0.1 qrCodeArray参数详解 <span id="qrcodeArray" />
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: (基本与诗小柒的二维码生成器传入参数差不多，就是多了dx、dy)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| text| 是 |  String |  | 二维码内容 |
| size|   | Number|  |  二维码大小 |
| dx|   | Number|  |  二维码在x轴上的位置 |
| dy|   | Number|  |  二维码在y轴上的位置 |
| background|   | String |  |  二维码背景色 |
| foreground|   | String |  |  二维码前景色 |
| correctLevel|   | Number |  |  二维码容错级别 |
| image|   | String |  |  二维码中心的图片，可以是网络路径也可以是本地路径 |
| imageSize|   | Number |  |   二维码图标大小 |

传入为Function类型示例代码: (推荐使用Function类型)
```javascript
qrCodeArray: ({bgObj, type, bgScale}) => {
								return [{
									text: '你好，我是取舍',
									// #ifndef H5
									image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559644434957&di=0db394a4ae41b6cff704fa3d4cbd997b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F30%2F20180630233629_GueV4.thumb.700_0.jpeg',
									// #endif
									// #ifdef H5
									image: '/static/2.jpg',
									// #endif
									size: bgObj.width*0.2,
									dx: bgObj.width*0.05,
									dy: bgObj.height - bgObj.width*0.25
								}]
							}
```


## 2.0.2 imagesArray参数详解 <span id="imagesArray" />
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: (与官方文档中的drawImage方法传入的参数一致，一般最多填前5个参数)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| url| 是 |  String |  | 图片路径，可以是网络路径也可以是本地路径 |
| dx|   | Number|  |  图像的左上角在目标canvas上 X 轴的位置 |
| dy|   | Number|  |  图像的左上角在目标canvas上 Y 轴的位置 |
| dWidth|   | Number|  |  在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeight|   | Number|  |  在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx|   | Number|  |  源图像的矩形选择框的左上角 X 坐标 |
| sy|   | Number|  |  源图像的矩形选择框的左上角 Y 坐标 |
| sWidth|   | Number|  |   源图像的矩形选择框的高度 |
| sHeight|   | Number|  |   源图像的矩形选择框的高度 |
| circleSet(5.0新增)|   | Object\|Boolean |  |   图片圆形设置, 详见`2.0.2.0.3` |
| infoCallBack (4.0新增)|   | Function|  |  接收自身图片信息并返回新参数的回调函数, 详见`2.0.2.0.2`示例 |
| roundRectSet(v16.0新增)| |  Object\|Boolean | | 圆角矩形图片设置, 详见`2.0.2.0.4` |
| `v3.0.1 新增`| | | | |
| alpha| |  Number | 1| 图片的透明度, 取值: [0, 1] |

### 2.0.2.0.1传入为Function类型示例代码(无infoCallBack ): (推荐使用Function类型)
```javascript
imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）, 图片为示例图片
	return [{
		url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559722952847&di=ce05a7206d3e0adeb1909a70ff7410ae&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F16%2F20170816080523_TmCUK.thumb.700_0.jpeg',
		dx: 300,
		dy: bgObj.height - 300,
		dWidth: 200,
		dHeight: 200
}]
}
```

### 2.0.2.0.2传入为Function类型示例代码(含infoCallBack ): (推荐使用Function类型)
```javascript
imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
  return [{
  	url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314428097,3858988978&fm=26&gp=0.jpg',
  	dx: 300,
  	dy: bgObj.height - 300,
  	infoCallBack(imageInfo) { //接受自身的图片信息对象
  		let scale = 200/imageInfo.height;
  		return {  // 需return新参数， 会覆盖原先的参数
  			dWidth: imageInfo.width*scale,
  			dHeight: 200
  		}
  	}
  }]
}
```

### 2.0.2.0.3 circleSet属性详解
| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| ~~circle~~ `废弃`|  |  Boolean|  | 是否设置圆形 |
| r|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形半径 |
| x|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形x坐标 |
| y|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形y坐标 |

注： r、x、y的值最终会传至Context.arc()方法, 并都有默认值，详见下方2.0.2.0.3.0.1

### 2.0.2.0.3.0.1 r、x、y默认值详解
r的默认值先判断是否有dWidth和dHeight,若有则取两者之间值较小的, 若无，则判断img自身的宽高取两者之间较小的，最终除以2<br />x的默认值为(dx  || 0 + r)<br />y的默认值为(dy || 0 + r)

### 2.0.2.0.4 roundRectSet属性详解
| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| r|  |  Number| 输出的图片宽度*.1 | 圆角半径 |


## 2.0.3 setCanvasWH参数详解
```
该参数传入一个方法，该方法返回两个参数，接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）
注： 确保能够改变画布大小，不然会有问题
```

示例代码:
```javascript
setCanvasWH: ({bgObj, type, bgScale}) => { // 为动态设置画布宽高的方法，
	this.poster = bgObj;
},
```


## 2.0.4 setCanvasToTempFilePath参数详解
```
该参数传入一个方法，该方法返回两个参数，接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）
该参数有默认， 一般可以不用填
必须return一个对象, 格式: (与官方文档中的setCanvasToTempFilePath方法传入的参数基本一致，除了canvasid与回调函数不用传)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| x| |  Number |  | 画布x轴起点（默认0） |
| y|   | Number|  |  画布y轴起点（默认0） |
| width|   | Number|  |  画布宽度（默认为canvas宽度-x）|
| height|   | Number|  |  画布高度（默认为canvas高度-y） |
| destWidth|   | Number|  | 输出图片宽度（默认为 width * 屏幕像素密度） |
| destHeight|   | Number|  |  输出图片高度（默认为 height * 屏幕像素密度） |
| fileType|   | String|  |  目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png' |
| quality|   | Number| .8 |   图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理 |

注：v11.0版本后该参数为拓展覆盖，所以无需所有参数都传

## 2.0.5 setDraw参数详解
```
该参数传入一个方法，该方法返回一个对象，该对象有三个参数{Context,bgObj,type}，分别是绘图上下文、背景图片的信息、自定义标识，可以在此方法中绘制自定义内容
示例代码:
```

```javascript
setDraw: ({Context, bgObj, type, bgScale}) => {
		Context.setFillStyle('black');
		Context.setGlobalAlpha(0.3);
		Context.fillRect(0, bgObj.height - 400, bgObj.width, 400);
		Context.setGlobalAlpha(1);
		Context.setFillStyle('white');
		Context.setFontSize(50);
		let text = '取舍'
		Context.fillText(text, bgObj.width - text.length * 50 - 50, bgObj.height - 185);
}
```

## 2.0.6 background参数详解
```
该参数传入一个对象，若无背景为图片的需求可用此属性设置画布背景的大小、颜色等, 若传该属性， 则不会去获取背景图片了
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| width|   | Number|  |  背景宽度|
| height|   | Number|  |  背景高度|
| backgroundColor| | Color| black  | 背景颜色 |


## 2.0.7 textArray参数详解 <span id="textArray" />
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: 
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| text| 是| String|  |  需绘制的文本|
| size|   | Number| 50 |  文字大小，v18.0+ `设置的文字若携带小数， 会向上取整`|
| color| | Color| black | 文字颜色 |
| alpha| | Number| 1| 透明度, 取值[0, 1] |
| textAlign| | String| left| 文字的x轴对齐模式, 可选值: 'left'、'center'、'right' |
| textBaseline| | String| middle| 文字的y轴对齐模式, 可选值: 'top'、'bottom'、'middle'、'normal' |
| dx| | Number| 0| 文字x轴位置 |
| dy| | Number| 0| 文字y轴位置 |
| lineThrough| | Object| | 设置删除线, `详见2.0.7.0.1`|
| infoCallBack| | Function| | 携带文本长度值的方法, 可以return一个对象，内含自身属性，并覆盖|
| lineFeed(v13.0新增)| | Object| | 设置换行, `详见2.0.7.0.2`|
|`v19.0新增`|          |        |     |     |
| font |  | String | 10px sans-serif | 字体属性, 若填此参数将忽略下方四个参数, 注意 字体大小需为整数 |
| fontStyle | | String | normal | 字体样式, 详见2.0.3 |
| fontVariant| | String | normal | 字体异体, 详见2.0.4 |
| fontWeight| | String | normal | 字体粗细, 详见2.0.5 |
| fontFamily| | String | sans-serif| 字体系列 |

### 2.0.7.0.1 lineThrough参数详解
```
用于设置删除线
传入参数如下:
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| width|   | Number| (`2.0.7`中设置的size)/10 |  删除线宽度|
| style| | Color| `2.0.7`中设置的color| 删除线颜色 |
| alpha| | Number| `2.0.7`中设置的alpha| 透明度, 取值[0, 1] |
| cap| | String| butt| 设置线条的端点样式 |

```javascript
textArray: ({bgObj, type, bgScale}) => {
	return [{
		text: '取舍',
		size: 50,
		color: 'white',
		alpha: .5,
		textAlign: 'left',
		textBaseline: 'middle',
		lineThrough: {
		  style: 'red'
		},
		infoCallBack(textLength) {
			return {
				dx: bgObj.width - textLength - 50,
				dy: bgObj.height - 245
			}
		}
	}]
}
```

### 2.0.7.0.2 lineFeed参数详解
```
用于设置换行
传入参数如下:
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| maxWidth|   | Number| 画布宽度 |  设置单行最大宽度|
| lineHeight| | Number| `2.0.7`中设置的size|行高， 一般要大于设置的字体大小 |
| lineNum| | Number| -1| 最多行数，若小于零则为无限 |
| dx| | Number| `2.0.7`中设置的dx| 换行后的x轴位置，不包含第一行，若小于零则为`2.0.7`中设置的dx |

```javascript
textArray: ({bgObj, type, bgScale}) => {
  return [{
  	text: '取舍取舍取舍取舍取舍取舍',
  	size: 50,
  	color: 'red',
  	alpha: .5,
  	textAlign: 'left',
  	textBaseline: 'middle',
  	lineFeed: {
  		maxWidth: 150,
  		lineHeight: 50,
  		lineNum: -1,
  		dx: -1
  	},
  	infoCallBack(textLength) {
  		return {
  			dx: 200,
  			dy: 20
  		}
  	}
  }]
}
```

### 2.0.7.0.3 fontStyle 参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。标准的字体样式 |
| italic | 斜体的字体样式 |
| oblique | 倾斜的字体样式 |

### 2.0.7.0.4 fontVariant参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。标准的字体 |
| small-caps | 小型大写字母的字体 |

### 2.0.7.0.5 fontWeight参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。定义标准的字符。 |
| bold | 定义粗体字符。 |


#  历次更新说明 <span id="oldUpdate"/>

| 版本号| 更新说明|
| --------- | -------- |
| v21.0| 修复小程序中二维码绘制错乱问题，参考了诗小柒的源码对输出图片进行延时 |
| v20.0| 微信小程序自动判断图片是否为https(比如 从微信获取用户信息，头像的路径是http开头的，在获取图片信息或下载的时候将自动转为https) |
| v19.0| textArray新增字体设置，详见2.0.7 |
| v18.0| 修复部分机型textArray设置文字大小带小数时绘制不出的问题,  设置的文字若携带小数， 会向上取整 非常感谢@QQ：447611296 小伙伴查到此问题的原因， 不过 因为在下这边无法重现问题， 还请小伙伴们测试一下 |
| v17.0| 1、修复textArray中没有传infocallBack返回dx、dy时不绘制的问题<br />2、`修改` 修改imageArray、textArray、qrCodeArray、setDraw等属性类型为Function时，回调函数的参数`更改`为一个对象类型数据，该对象一般拥有bgObj、type、bgScale三个参数, `当布局不使用画布的宽高动态布局并且参照原设计图尺寸绘制时，则需将最终数值乘以bgScale`<br />3、新增Context属性， 传入画布对象, （一般不用） |
| v16.0| 1、imageArray新增roundRectSet属性，用于设置圆角矩形图片, 详见2.0.2<br />2、修复小程序真机无法绘制图片问题, 原来小程序还是要下载图片以后才能绘制的<br />3、imageArray的circleSet废弃circle参数，circleSet参数可以传Boolean类型，也可以传Object类型<br />4、修复第二次绘制海报时文字错位问题  |
| v15.0| 修复lineFeed设置lineHeight属性时 也会对第一行文字的dy属性设置, 导致布局不准确的问题  |
| v14.0| 修复IOS无法绘制问题，增加了bgScale参数来缩放背景图，所以一般布局最好使用背景图的宽高来进行布局 , 详见2. (但是 ， 仍需测试)  |
| v13.0| textArray新增换行功能(与QQ：1219848990小伙伴一起写的, 感谢!), 详见2.0.7   |
| v12.0| 1、新增textArray属性， 详见2.0.7<br />2、QS-SharePoster.js中除了默认导出的主方法外，还导出了setTextArray(设置文本数据)、 setImagesArray(设置图片数据)、drawText(绘制文本)、drawImage(绘制图片)、 drawQrCode(绘制二维码)等方法, 第一个参数传入画布对象，第二个参数传入对应数据，即可使用   |
| v11.0| 1、H5支持setCanvasToTempFilePath属性中的quality属性, 若图片生成慢可以调整图片生成的质量, 默认0.8<br />2、新增background属性, 详见2.0.6<br />3、所绘制的图片除背景图外均不在下载(发现原来不用下载也能绘制上去, 所以注释了下载图片的代码)  |
| v10.0| 1、优化H5图片生成方式， 非常感谢QQ：624823464小伙伴解决并提供的此问题<br />2、示例项目中为H5增加本地图片示例<br />3、新增console打印管理, 详见app.js的log属性  |
| v9.0| 修复H5生成的图片尺寸问题, 感谢qq: 2548017453  |
| v8.0| 疑似修复H5， 因为跨域问题没有继续测试， 还请有用到H5的小伙伴测试一下  |
| v7.0| 修复背景图片不能使用本地图片问题, 若使用本地路径图片, 建议写绝对路径, 注：网络图片与本地图片的区分是以图片路径字符串substring(0, 4)是否为http来判断的  |
| v6.0| 修复QS-SharePoster.js文件中281行的传参不正确问题  |
| v5.0| imageArray中的图片可设置圆形图片------circleSet属性，详见2.0.2  |
| v4.0| imageArray属性新增infoCallBack属性，该属性类型为Function, 接受一个对象，该对象是该项图片的图片信息，该方法需返回一个对象，对象里的属性可以是原本imageArray中项内属性除url外的所有属性，infoCallBack返回的对象属性会覆盖原先的属性, 获取自身的图片信息后可以更好的绘制海报啦~   |
| v3.0| `修复背景图存储本地机制, 建议更新`， 背景图从后端获取后会以‘/’字符分割后的最后一位为name，QS-SharePoster会判断此name是不是和本地相同，若不同则从后端获取重新生成，若相同则使用本地路径，name判断通过后，还会判断图片宽高信息，不通过则重新获取，所以， 若后端需换背景图，则将新上传的图片命名不要相同与前一次, 或宽高不同于前一次即可 |
| v2.0| 新增backgroudImage、type属性，完善文档  |

---

# [`遇到问题汇总!!!!!!!`](#question)

## QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

---
## 作者想说
二维码生成参考了 `诗小柒` 的[二维码生成器](https://ext.dcloud.net.cn/plugin?id=39)， 感谢 `诗小柒`!
base64工具使用了 `瞳player` 的[image-tools](https://ext.dcloud.net.cn/plugin?id=123)， 感谢 `瞳player`!
也感谢qq：1846492969 的帮助

如果该插件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)\*✲ﾟ\*  蟹蟹~拜托啦~

---
## 组件简介
一款自我感觉良好、实用的海报生成器

---

# 警告
`小程序中请注意自己的获取图片信息的api--getImageInfo 是否正常获取图片信息，否则绘制不出来`
`重要:`如果小程序有绘制微信用户头像需求的, 把https://thirdwx.qlogo.cn、https://wx.qlogo.cn都配置到小程序后台下载域名去


# 兼容性
### APP、微信小程序、H5、支付宝小程序(注意在canvas组件加上id)、其他未测

# 绘制图片类型注意
### 支持 网络图片、base64图片(v3.0.6+, H5、APP、微信小程序)
### 若要使用本地图片, 最好import一下

# 绘制类型大纲
* ### [image-图片](#image)
* ### [text-文本](#text)
* ### [qrcode-二维码](#qrcode)
* ### [custom-自定义绘制](#custom)
* ### v3.0.6 新增
* ### [fillRect-填充矩形](#fillRect)
* ### [strokeRect-线性矩形](#strokeRect)
* ### [roundStrokeRect-线性圆角矩形](#roundStrokeRect)
* ### [roundFillRect-填充圆角矩形](#roundFillRect)

#  1. 相关说明
## 1.0.0画布相关
```
首先目前有两种方式, 根据背景图绘制和自定义画布绘制,
1、根据背景图绘制
	该方式中画布大小跟随背景图大小，而背景图的设置有两种方式:
		a、app.js中的getPosterUrl方法获取 (若采用此方法则需自行配置)
		b、传参backgroundImage为图片地址
2、自定义画布绘制
	该方式需传background属性, 根据其属性控制画布的大小颜色

优先级: background> backgroundImage> app.js-getSharePoster()
注: 所以如果传了backgroundImage就不会去app.js获取背景图片, 如果传了background就不会绘制背景图片
```

# 2.使用概览
```html
<canvas :id="canvasId" :canvas-id="canvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
```
```javascript
import { getSharePoster } from '@/.../QS-SharePoster.js';	//路径自己调整
var ctx;
var _this;
export default {
	data() {
		return {
			canvasId: 'testId',
			poster: {}
		}
	},
	created() {
		_this = this;
	},
	mounted() {
		ctx = uni.createCanvasContext(this.canvasId, this);
	},
	methods: {
		async draw() {
			const posterResult = await getSharePoster({	//return Promise
				_this: _this, //若在组件中使用必传, 若传draw:false 则没有必要
				type: 'customType',	//自定义标识
				posterCanvasId: this.canvasId, //canvasId
				Context: ctx,	//强烈推荐传入自己创建的canvas实例, uni.createCanvasContext(canvasId, this), 以防出现卡在绘制中的问题
				delayTimeScale: 20, //元素延时系数
				drawDelayTime: 100, //额外延时时长, 生成白图时调大此参数
				draw: false, //canvasContext.draw 方法， 此方法最好自己在页面上调用, 并生成图片
				backgroundImage: '', //背景图片路径
				background: {	//设置自定义背景画布,优先级大于背景图片,若传该属性则背景图失效
					height: , //画布高度
					width: , //画布宽度
					backgroundColor: //背景颜色
				},
				setCanvasWH: ({	//一般必传， 动态设置canvas宽高
					bgObj
				}) => {
					this.poster = bgObj
				},
				drawArray({	//绘制序列
					bgObj,	//背景图对象
					type,	//自己设置的自定义标识
					bgScale,	//背景缩放
					setBgObj,	//动态设置画布(宽高),若使用该方法不建议背景图方式绘制, 建议使用background自定义画布绘制, 因为这个方法绘制修改背景图的宽高
					getBgObj	//获取动态设置的画布宽高
				}) {
					//return new Promise((rs, rj)=>{ rs([Obejct, ...]) })
					//或者
					//return [Obejct, ...]
					return [
						{
							//公共属性,
							serialNum: -∞,	//allInfoCallback排序, 越小越先执行allInfoCallback
							allInfoCallback: ({drawArray})=>{	//可以返回整个绘制序列的方法, 可以自定义id来获取某个绘制序列项
								//return new Promise((rs, rj)=>{ rs([Obejct, ...]) })
								//或者
								//return [Obejct, ...]
								//最终输出的对象属性会覆盖原属性
							},
							
							type: '', // 绘制类型, 详见上方 绘制类型大纲
							//...对应type的属性, 详见下方
						}
					]
				}
			}）
			
			//因为 前面传了 draw: false, 需要自己调用画布对象的draw方法后生成图片, 这样做可以确保稳定性, 以防出现卡在绘制中问题
			ctx.draw(false, ()=>{
				uni.canvasToTempFilePath({
					canvasId: this.canvasId,
					fileType: 'jpg',
					quality: .8,
					success: res=>{
						console.log('生成图片成功: ' + res.tempFilePath);
					}
				}, this)
			})
		}
	}

}
```


# 传入参数详解

`注：所有传入的图片路径都为网络图片`

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| posterCanvasId | 是 |  String |  | 页面中绘制海报的画布的id |
| type |   | all|    |   自定义标识，用于逻辑判断 |
| backgroundImage |  | String |  | 背景图片路径，优先级大于app.js中getPosterUrl方法返回的路径 |
| reserve| | Boolean | false | 本次绘制是否接着上一次绘制 |
| qrCodeArray| | Array \| Function| | 需绘制的二维码数组，若传入的类型为Function，则可以接收一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 且必须return一个数组，推荐传入Function类型|
| imagesArray| | Array \| Function | |需绘制的图片数组，若传入的类型为Function，则可以接收一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 且必须return一个数组，推荐传入Function类型|
| setCanvasWH| （一般来说）是| Function | | 动态设置画布宽高的方法，该方法返回一个对象, 该对象有三个参数，bgObj是背景图片的宽高等信息，type是自定义标识type，bgScale是背景图片宽高缩放比例, 可以根据背景图给画布定宽高 |
| setCanvasToTempFilePath| | Object\|Function  | | 设置绘制完毕后的生成海报临时路径参数,该参数有默认, 一般可以不用填|
| setDraw| | Function | | 自定义绘制方法，该方法接收一个对象 |
| background| | Object| | 背景图对象 |
| textArray| |  Array \| Function| | 需绘制的文本数组，若传入的类型为Function，则可以接收两个参数，第一个参数是背景图片的宽高等信息，第二个参数为自定义标识type ， 且必须return一个数组，推荐传入Function类型 |
| bgScale| |  Number | 0.75| 为了IOS能正常绘制对背景图进行缩放，取值(0,1)， 若IOS还是绘制不出可以 尝试下调此参数 |
| Context| |  CanvasContext| | 画布对象，一般不用 |
| `v3.0.0更新` | |  | |   `v3.0.0开始推荐使用drawArray绘制, 不需要再用其他的xxxArray绘制了`|
| drawArray| | Array \| Function| | 可控层级的绘制序列, 层级的顺序就是数组的顺序, 可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报 |
| delayTimeScale| | Number| 15| 根据绘制序列每一项延时该参数的时间 |
| drawDelayTime| | Number| 100| draw方法延时时间|
| _this| | Vue | | 传入当前vue实例this指向, 组件中使用时必传|
| `v3.0.1更新` | |  | |   |
| formData| | Any | | app.js中的getPosterUrl方法可获得该属性 用于获取背景图时携带的自定义数据|
| `v3.1.1更新` | |  | |   |
| canvas2image| | Boolean | | 是否自动调用uni.canvasToTempFilePath生成并返回图片路径|
| `v3.1.3更新` | |  | |   |
| draw| | Boolean | | 是否自动调用CanvasContext.draw而进行后续操作|


## background参数详解
```
该参数传入一个对象，若无背景为图片的需求可用此属性设置画布背景的大小、颜色等, 若传该属性， 则不会去获取背景图片了
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| width|   | Number|  |  背景宽度|
| height|   | Number|  |  背景高度|
| backgroundColor| | Color| black  | 背景颜色 |


## setCanvasWH参数详解
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


## setCanvasToTempFilePath参数详解
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
| fileType|   | String|  jpg|  目标文件的类型，只支持 'jpg' 或 'png' |
| quality|   | Number| .8 |   图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理 |

注：v11.0版本后该参数为拓展覆盖，所以无需所有参数都传


## drawArray参数详解<span id="drawArray" />
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
| `v3.1.3更新` | |  | |   |
| zIndex| | Number|  -∞| 在allInfocallback完成后，会再次以此参数排序, 数值越大层级越高|
| `over` | |  | |   |
| type| 是| String|  | 绘制类型, 可选值 'text'、'image'、'qrcode'、'custom'|
| `type为text时`| | |  |  |
|... | | |  | 参数详见[`text`](#text) |
| `type为image时`| | |  |  |
|... | | |  | 参数详见[`image`](#image) |
| `type为qrcode时`| | |  |  |
|... | | |  | 参数详见[`qrcode`](#qrcode) |
| `type为custom时`| | |  | 参数详见[`custom`](#custom) |
| setDraw| | |  | 该属性传入一个方法，接收一个参数-画布对象，可在方法中自定义绘制内容|
| `v3.0.6更新` | |  | |   |
| `type为fillRect时`| | |  |  |
|... | | |  | 参数详见[`fillRect`](#fillRect) |
| `type为strokeRect时`| | |  |  |
|... | | |  | 参数详见[`strokeRect`](#strokeRect) |
| `type为roundStrokeRect时`| | |  |  |
|... | | |  | 参数详见[`roundStrokeRect`](#roundStrokeRect) |
| `type为roundFillRect时`| | |  |  |
|... | | |  | 参数详见[`roundFillRect`](#roundFillRect) |

注: 当drawArray为function时，v3.0.5新增setBgObj与getBgObj方法，详见示例项目


## qrCode类型参数详解 <span id="qrcode" />
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
| image|   | String |  |  二维码中心的图片 |
| imageSize|   | Number |  |   二维码图标大小 |


## image类型参数详解 <span id="image" />
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: (与官方文档中的drawImage方法传入的参数一致，一般最多填前5个参数)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| url| 是 |  String |  | 网络图片路径 |
| dx|   | Number|  |  图像的左上角在目标canvas上 X 轴的位置 |
| dy|   | Number|  |  图像的左上角在目标canvas上 Y 轴的位置 |
| dWidth|   | Number|  |  在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeight|   | Number|  |  在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx|   | Number|  |  源图像的矩形选择框的左上角 X 坐标 |
| sy|   | Number|  |  源图像的矩形选择框的左上角 Y 坐标 |
| sWidth|   | Number|  |   源图像的矩形选择框的高度 |
| sHeight|   | Number|  |   源图像的矩形选择框的高度 |
| circleSet(5.0新增)|   | Object\|Boolean |  |   图片圆形设置 |
| infoCallBack (4.0新增)|   | Function|  |  接收自身图片信息并返回新参数的回调函数 |
| roundRectSet(v16.0新增)| |  Object\|Boolean | | 圆角矩形图片设置 |
| `v3.0.1 新增`| | | | |
| alpha| |  Number | 1| 图片的透明度, 取值: [0, 1] |
| `v3.0.8 新增`| | | | |
| mode| |  String | scaleToFill| 同uni image组件的mode属性, 目前支持 scaleToFill、aspectFit、aspectFill |

### circleSet属性详解
| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| ~~circle~~ `废弃`|  |  Boolean|  | 是否设置圆形 |
| r|  |  Number| 详见下方 | 圆形半径 |
| x|  |  Number| 详见下方 | 圆形x坐标 |
| y|  |  Number| 详见下方 | 圆形y坐标 |

注： r、x、y的值最终会传至Context.arc()方法, 并都有默认值，详见下方

### r、x、y默认值详解
r的默认值先判断是否有dWidth和dHeight,若有则取两者之间值较小的, 若无，则判断img自身的宽高取两者之间较小的，最终除以2<br />x的默认值为(dx  || 0 + r)<br />y的默认值为(dy || 0 + r)

### roundRectSet属性详解
| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| r|  |  Number| 输出的图片宽度*.1 | 圆角半径 |


## custom类型详解 <span id="custom" />
```javascript
{
	type: 'custom',
	setDraw: (Context) => {
			Context.setFillStyle('black');
			Context.setGlobalAlpha(0.3);
			Context.fillRect(0, bgObj.height - 400, bgObj.width, 400);
			Context.setGlobalAlpha(1);
			Context.setFillStyle('white');
			Context.setFontSize(50);
			let text = '取舍'
			Context.fillText(text, bgObj.width - text.length * 50 - 50, bgObj.height - 185);
	}
}
```

## text类型参数详解 <span id="text" />

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| text| 是| String|  |  需绘制的文本|
| size|   | Number| 50 |  文字大小, `设置的文字若携带小数， 会向上取整`|
| color| | Color| black | 文字颜色 |
| alpha| | Number| 1| 透明度, 取值[0, 1] |
| textAlign| | String| left| 文字的x轴对齐模式, 可选值: 'left'、'center'、'right' |
| textBaseline| | String| middle| 文字的y轴对齐模式, 可选值: 'top'、'bottom'、'middle'、'normal' |
| dx| | Number| 0| 文字x轴位置 |
| dy| | Number| 0| 文字y轴位置 |
| lineThrough| | Object| | 设置删除线|
| infoCallBack| | Function| | 携带文本长度值的方法, 可以return一个对象，内含自身属性，并覆盖|
| lineFeed(v13.0新增)| | Object| | 设置换行|
|`v19.0新增`|          |        |     |     |
| font |  | String | 10px sans-serif | 字体属性, 若填此参数将忽略下方四个参数, 注意 字体大小需为整数 |
| fontStyle | | String | normal | 字体样式|
| fontVariant| | String | normal | 字体异体|
| fontWeight| | String | normal | 字体粗细 |
| fontFamily| | String | sans-serif| 字体系列 |

### lineThrough参数详解
```
用于设置删除线
传入参数如下:
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| width|   | Number| (本身设置中中设置的size)/10 |  删除线宽度|
| style| | Color|本身设置中中设置的color| 删除线颜色 |
| alpha| | Number| 本身设置中中设置的alpha| 透明度, 取值[0, 1] |
| cap| | String| butt| 设置线条的端点样式 |


### lineFeed参数详解
```
用于设置换行
传入参数如下:
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| maxWidth|   | Number| 画布宽度 |  设置单行最大宽度|
| lineHeight| | Number| 本身设置中中设置的size|行高， 一般要大于设置的字体大小 |
| lineNum| | Number| -1| 最多行数，若小于零则为无限 |
| dx| | Number|本身设置中中设置的dx| 换行后的x轴位置，不包含第一行，若小于零则为本身设置中设置的dx |

### fontStyle 参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。标准的字体样式 |
| italic | 斜体的字体样式 |
| oblique | 倾斜的字体样式 |

### fontVariant参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。标准的字体 |
| small-caps | 小型大写字母的字体 |

### fontWeight参数详解
| 属性名 |  说明 |
| --------- | ---- |
| normal | 默认值。定义标准的字符。 |
| bold | 定义粗体字符。 |



## fillRect类型(填充直角矩形) <span id="fillRect" />

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| backgroundColor| | Color|  |  填充颜色|
| alpha|   | Number| 1 |  透明度, 取值[0, 1]|
| dx| | Number| 0 | x轴位置 |
| dy| | Number| 0| y轴位置 |
| width| | Number| 0| 宽度 |
| height| | Number| 0| 高度 |

## strokeRect类型(线性直角矩形) <span id="strokeRect" />

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| color| | Color|  |  线条颜色|
| lineWidth| | Number|  |  线条宽度|
| dx| | Number| 0 | x轴位置 |
| dy| | Number| 0| y轴位置 |
| width| | Number| 0| 宽度 |
| height| | Number| 0| 高度 |

## roundStrokeRect类型(线性圆角矩形) <span id="roundStrokeRect" />

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| color| | Color|  |  线条颜色|
| lineWidth| | Number|  |  线条宽度|
| r| | Number| this.width*.1 |  圆角大小|
| dx| | Number| 0 | x轴位置 |
| dy| | Number| 0| y轴位置 |
| width| | Number| 0| 宽度 |
| height| | Number| 0| 高度 |

## roundFillRect类型(填充圆角矩形) <span id="roundFillRect" />

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| backgroundColor| | Color|  | 填充颜色|
| r| | Number| this.width*.1 |  圆角大小|
| dx| | Number| 0 | x轴位置 |
| dy| | Number| 0| y轴位置 |
| width| | Number| 0| 宽度 |
| height| | Number| 0| 高度 |


## 遇到的问题汇总 <span id="question" />
* #### 小程序报“request:fail url not in domain list”
 > * #### 需要检查报错图片的域名是否在后台已配置(详细检查， 比如是否有绘制微信头像等容易忽略的非自己服务器的图片)
* #### 卡在“准备海报数据”
 > * #### 一般是网络图片下载时或获取图片信息时出错，需要调通uni.downloadFile 和 uni.getImageInfo api
* #### 卡在“绘制中”
 > * #### 一般是Canvas实例的问题，可以自己在页面生成Canvas实例传入 Context 属性中
 > * #### 可以传draw属性为false, 而后在Promise完成状态后自己调用CanvasContext的draw方法绘制
* #### 绘制白图
 > * #### 如果是 ios 运行在APP-PLUS， 一般是画布大小超出了Canvas的尺寸限制，影响画布大小的因素有background所设置的大小和backgroundImage背景图片的尺寸
 > * #### 有可能是绘制的内容较复杂需要时间，可以设置drawDelayTime来延时生成，单位为毫秒
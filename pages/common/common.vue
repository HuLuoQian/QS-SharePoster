<template>
	<view class="content">
		<!-- 说明 -->
		<text style="font-size: 29rpx;color: #999;">
			QS-SharePoster.js中导出了一个方法--getSharePoster \n
			getSharePoster 为一个function，传入一个Object为配置参数对象, 最终return一个Promise对象 \n
			配置参数对象参数如下: { \n
				posterCanvasId: 'String 页面中canvas组件的canvasid属性', \n
				type: 'Any 自定义标识, 用于逻辑判断', \n
				bgScale: 'Number 自定义缩放系数, 默认0', \n
				formData: 'Any 若背景图为app.js获取， 则该参数将传至app.js中的获取背景图方法中用于访问接口携带参数', \n
				backgroundImage: 'String 背景图地址, 优先级大于app.js获取背景图', \n
				background: 'Object: { height: '画布高度', width: '画布宽度', backgroundColor: '背景颜色' } 自定义背景, 优先级大于backgroundImage', \n
				reserve: 'Boolean 是否接着上次继续绘制', \n
				drawArray: 'Function|Array有序绘制序列', \n
				setCanvasWH: 'Function 用于设置当前页面所绑定画布的宽高, 一般必填', \n
				setCanvasToTempFilePath: 'Function | Object uni.canvasToTempFilePath 配置参数', \n
				Context: 'canvasContext 画布实例', \n
				_this: 'Vue Vue实例', \n
				delayTimeScale: 'Number 延时系数', \n
				drawDelayTime: 'Number draw方法延时时间值' \n
			} \n
		</text>
		<!-- 生成海报 -->
		<button type="primary" @tap="shareFc()">生成海报</button>
		<!-- 图片展示由自己实现 -->
		<QSPopup ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view>
			</view>
		</QSPopup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import _app from '@/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/util/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId'
			}
		},
		methods: {
			async shareFc() {
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						/* background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#666'
						}, */
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('black');
											Context.setGlobalAlpha(0.3);
											Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
											Context.setGlobalAlpha(1);
										}
									},
									{
										type: 'image',
										url: '/static/3.jpg',
										alpha: .3,
										dx,
										dy: bgObj.height - bgObj.width * 0.25,
										infoCallBack(imageInfo) {
											let scale = bgObj.width * 0.2 / imageInfo.height;
											return {
												circleSet: {
													x: imageInfo.width * scale / 2,
													y: bgObj.width * 0.2 / 2,
													r: bgObj.width * 0.2 / 2
												}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
												dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
												dHeight: bgObj.width * 0.2,
												/* roundRectSet: { // 圆角矩形
													r: imageInfo.width * .1
												} */
											}
										}
									},
									{
										type: 'text',
										fontStyle: 'italic',
										text: '取舍',
										size: fontSize,
										color: 'white',
										alpha: .5,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight * 3
											}
										},
										serialNum: 0,
										id: 'tag1'	//自定义标识
									},
									{
										type: 'text',
										text: '取舍',
										fontWeight: 'bold',
										size: fontSize,
										color: 'white',
										alpha: .75,
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 1,
										allInfoCallback({	//v3.0.1 更新 可以获取drawArray中全部数据
											drawArray
										} = {}) {
											const obj = drawArray.find(item => item.id === 'tag1');
											/* return {
												dx: obj.dx,
												dy: obj.dy + lineHeight
											} */
											//也可以return promise对象
											return new Promise((rs, rj) => {
												setTimeout(() => {
													rs({
														dx: obj.dx,
														dy: obj.dy + lineHeight
													});
												}, 1);
											});
										}
									},
									{
										type: 'text',
										text: '取舍',
										size: fontSize,
										color: 'white',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight
											}
										}
									},
									{
										type: 'qrcode',
										text: '你好，我是取舍',
										size: bgObj.width * 0.2,
										dx: bgObj.width*0.05,
										dy: bgObj.height - bgObj.width*0.25
									}
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					this.$refs.popup.show()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.$refs.popup.hide()
			}
		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>

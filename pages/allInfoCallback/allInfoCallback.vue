<template>
	<view class="content">
		<!-- 说明 -->
		<text style="font-size: 29rpx;color: #999;">
			allInfoCallback为drawArray有序序列专属 \n
			可以获取该有序序列内所有元素的信息 \n
			可以用serialNum控制顺序，serialNum越小越先执行 \n
			allInfoCallback可以return一个对象或Promise对象(最终resolve一个对象)用以更新覆盖原属性
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
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId"
				:style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import _app from '@/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/util/QS-SharePoster/QS-SharePoster.js';
	var ctx;
	export default {
		data() {
			return {
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId'
			}
		},
		mounted() {
			ctx = uni.createCanvasContext(this.canvasId, this);
		},
		methods: {
			async shareFc() {
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						Context: ctx,
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						draw: false, //是否执行ctx.draw方法, 推荐false，自己去draw
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
											Context.fillRect(0, bgObj.height - bgObj
												.height * 0.2, bgObj.width, bgObj
												.height * 0.2);
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
											let scale = bgObj.width * 0.2 / imageInfo
												.height;
											return {
												circleSet: {
													x: imageInfo.width * scale / 2,
													y: bgObj.width * 0.2 / 2,
													r: bgObj.width * 0.2 / 2
												}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
												dWidth: imageInfo.width *
												scale, // 因为设置了圆形图片 所以要乘以2
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
										text: '一二\n三四五六七八九十十一十二<br />十三十四十五十六十七十八十九二十二十一二十二',
										size: fontSize,
										color: 'white',
										serialNum: 0,
										id: 'lineFeed',
										dx: bgObj.width * .1,
										dy: bgObj.height * .1,
										lineFeed: {
											maxWidth: bgObj.width * .3,
											lineNum: 2
										}
									},
									{
										type: 'text',
										fontStyle: 'italic',
										text: '我可以获取上面换行的数据, 跟在他后面',
										size: fontSize,
										color: 'white',
										serialNum: 1,
										dx: bgObj.width * .1,
										lineFeed: {
											maxWidth: bgObj.width * .3,
										},
										allInfoCallback({
											drawArray
										} = {}) {
											const lineFeeds = drawArray.filter(ite => ite.id == 'lineFeed');
											const last = lineFeeds[lineFeeds.length - 1];
											const r = {
												dy: last.dy + fontSize + 15
											}
											return r;
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
											_app.log(
												'index页面的text的infocallback ，textlength:' +
												textLength);
											return {
												dx: bgObj.width - textLength - fontSize,
												dy: bgObj.height - lineHeight * 3
											}
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
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
										allInfoCallback({ //v3.0.1 更新 可以获取drawArray中全部数据
											drawArray
										} = {}) {
											const obj = drawArray.find(item => item.id === 'tag1');
											const lineFeed = drawArray.filter(item => item.id === 'lineFeed');
											/* return {
												dx: obj.dx,
												dy: obj.dy + lineHeight
											} */
											//也可以return promise对象
											return new Promise((rs, rj) => {
												setTimeout(() => {
													rs({
														dx: obj.dx,
														dy: obj
															.dy +
															lineHeight
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
										dx: bgObj.width * 0.05,
										dy: bgObj.height - bgObj.width * 0.25
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
					ctx.draw(false, ()=>{
						uni.canvasToTempFilePath({
							canvasId: this.canvasId,
							success: res => {
								this.posterImage = res.tempFilePath;
								_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + res.tempFilePath);
								this.$refs.popup.show()
							},
							fail: err => {
								console.log('生成异常', err)
							}
						})
					})
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
		/* perspective: 2500upx; */
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		/* backface-visibility: hidden; */
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

<template>
	<view class="content">
		<!-- 说明 -->
		<text style="font-size: 29rpx;color: #999;">
			drawArray为Function时, 携带参数对象新增方法setBgObj、getBgObj\n
			setBgObj为动态设置画布大小方法传参 { height: Number, width: Number }\n
			getBgObj方法返回最新的画布信息\n
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
				canvasId: 'default_PosterCanvasId',
				count: 0
			}
		},
		methods: {
			async shareFc() {
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [
								{
									type: 'image',
									id: 'productImage',
									url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F09%2F20180209120154_oycpr.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613449188&t=6f2f5c5a6150b5cc5e516e7d998bf7b2',
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .3;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										setBgObj({
											width,
											height: height + addHeight
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									id: 'productName',
									text: '取舍',
									color: '#000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .25,
										}
									}
								},
								{
									type: 'text',
									text: '棒棒哒~',
									color: '#f1505c',
									serialNum: 2,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .5,
										}
									}
								},
								{
									type: 'text',
									text: '无情哈拉少',
									serialNum: 3,
                  id: 'text1',
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .75,
										}
									}
								},
                {
                	type: 'text',
                	text: '无情哈拉少1111111',
                	serialNum: 4,
                	allInfoCallback({
                		drawArray
                	}) {
                		const productImage = drawArray.find(item => item.id === 'productImage')
                    const text1 = drawArray.find(item => item.id === 'text1')
                    console.log(text1.textLength, 1111111111111111111111111)
                		const addHeight = getBgObj().height - productImage.dHeight;
                		return {
                			size: getBgObj().width * 0.05,
                			lineFeed: {
                				maxWidth: getBgObj().width * 0.5,
                				lineNum: 1
                			},
                			dx: getBgObj().width * .05 + text1.textLength,
                			dy: productImage.dHeight + addHeight * .75,
                		}
                	}
                },
								{
									type: 'qrcode',
									text: '123456',
									serialNum: 5,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										const widthSize = getBgObj().width * .4;
										const heightSize = addHeight;
										const countSize = widthSize > heightSize ? heightSize : widthSize;
										const size = countSize * .9;
										return {
											size: size,
											dx: getBgObj().width - countSize * .95,
											dy: getBgObj().height - countSize * .95
										}
									}
								}
							]
						}
					})
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

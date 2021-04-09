<template>
	<view>
		<view @touchmove.stop.prevent="voidFc" @tap.stop="maskHide" class="fadeIn_mask" :class="showBl?'show':'hide'"></view>
		<view @touchmove.stop.prevent="voidFc" :class="[('QS_' + type), showBl?'show':'hide']">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type:{
				type: String,
				default: 'fadeInMiddle'
			},
			tapMaskHide: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showBl: false
			}
		},
		methods: {
			show() {
				this.showBl = true;
			},
			maskHide() {
				if(this.tapMaskHide) this.hide();
			},
			hide() {
				this.showBl = false;
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	@import url("css/QS-popup.css");
</style>

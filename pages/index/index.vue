<template>
	<view>
		<button type="default" style="margin-top: 30px;" @tap="go('/pages/common/common')">普通示例1</button>
		<button type="default" style="margin-top: 30px;" @tap="go('/pages/infoCallBack/infoCallBack')">infoCallBack的使用</button>
		<button type="default" style="margin-top: 30px;" @tap="go('/pages/allInfoCallback/allInfoCallback')">allInfoCallback的使用</button>
		<button type="default" style="margin-top: 30px;" @tap="go('/pages/setBgObjAndGetBgObj/setBgObjAndGetBgObj')">setBgObj与getBgObj</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style>

</style>
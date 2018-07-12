<template>
  <div class="recommend" ref="recommend">
    我是推荐页面
    <a href="gsp.html">去gsp页面</a>
    <div>
      哈哈哈测试呀
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Recommend'
};
</script>
<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>

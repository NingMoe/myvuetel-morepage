<template>
  <div class="rank" ref="rank">
    我是排行页面
    <div>
      哈哈哈测试呀
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Rank'
};
</script>
<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>

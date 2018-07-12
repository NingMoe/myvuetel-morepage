<template>
  <div class="search" ref="search">
    我是搜索页面
    <div>
      哈哈哈测试呀
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Search'
};
</script>
<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>

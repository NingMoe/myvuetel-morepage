<template>
  <div class="singer" ref="singer">
    我是歌手页面
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Singer'
};
</script>
<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>

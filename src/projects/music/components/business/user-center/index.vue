<template>
  <div class="user-center" ref="user-center">
    我是用户中心页面
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'UserCenter'
};
</script>
<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
.user-center {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  background-color: #000;
}
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="chang.html">去chang页面</a>
    <a href="music.html">去音乐页面</a>
  </div>
</template>

<script>
export default {
  name: 'Dashboard1',
  data() {
    return {
      msg: '我是gsp项目的dashboard1'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

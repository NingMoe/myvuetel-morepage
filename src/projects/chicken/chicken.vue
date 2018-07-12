<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type='text/ecmascript-6'>
import VHeader from './components/dashboard/header';
import Tab from './components/dashboard/tab';

console.log($('#app'));
export default {
  name: 'App',
  components: {
    VHeader,
    Tab
  }
};
</script>

<style scoped rel='stylesheet/scss' lang='scss'>
</style>

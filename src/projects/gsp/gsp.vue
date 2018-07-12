<template>
  <div id="app">
    <dashboard1></dashboard1>
  </div>
</template>

<script>
import Dashboard1 from './components/dashboard/dashboard1';
export default {
  name: 'Gsp',
  components: { Dashboard1 }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

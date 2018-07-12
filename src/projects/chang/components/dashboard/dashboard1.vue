<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="goGsp">去gsp页面</button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard1',
  data() {
    return {
      msg: '我是chang项目的dashboard1'
    };
  },
  methods: {
    goGsp() {
      window.location.href = 'gsp.html?name=gsp';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

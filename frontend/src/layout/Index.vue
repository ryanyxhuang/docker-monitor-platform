<template>
  <div id="app">
    <m-header/>
    <div class="container">
      <m-aside/>
      <m-main/>
    </div>
  </div>
</template>

<script>
import MHeader from './Header.vue'
import MAside from './Aside.vue'
import MMain from './Main.vue'

export default {
  components: {
    MHeader, MAside, MMain
  }
}
</script>

<style>
  @import "../assets/css/index.scss";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .container {
    flex: 1;
    display: flex;
    position: relative;
  }
</style>

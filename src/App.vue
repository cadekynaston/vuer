<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>

<style lang="scss">

@import '@/design/index.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

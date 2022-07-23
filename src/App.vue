<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'Cryptotracker',
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
  }
</style>

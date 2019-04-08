<template lang='pug'>
  #app
    router-view
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getMempool')
    setInterval(() => this.$store.dispatch('getMempool'), 5000)
  }
}
</script>

<style lang='sass'>
body
  padding: 20px
</style>

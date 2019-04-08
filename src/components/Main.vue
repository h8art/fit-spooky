<template lang="pug">
a-card(title='Mempool')
  a-list(itemlayout='horizontal', :dataSource='getMempoolList')
    a-list-item(slot='renderItem', slot-scope='item, index')
      a-list-item-meta
        span(slot='title') {{item.id}}
      a-button(type="danger",v-if='getSubscribedList.includes(item.id)',@click='unsubscribeTransaction(item.id)') Unsubscribe
      a-button(type="primary",v-else, @click='subscribeTransaction(item.id)') Subscribe
</template>
<script>
export default {
  computed: {
    getSubscribedList() {
      return this.$store.state.subscribed
    },
    getMempoolList() {
      return this.$store.state.mempool
    }
  },
  methods: {
    subscribeTransaction (id) {
      this.$store.dispatch('subscribeTransaction', id)
    },
    unsubscribeTransaction (id) {
      this.$store.dispatch('unsubscribeTransaction', id)
    }
  }
}
</script>
<style lang="sass" scoped>

</style>

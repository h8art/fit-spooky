import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { differenceBy, intersection, difference } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mempool: [],
    subscribed: []
  },
  mutations: {
    updateMempool (state, mempool) {
      state.mempool = mempool
    },
    addSubscribed (state, id) {
      state.subscribed.push(id)
    },
    removeSubscribed (state, id) {
      state.subscribed = state.subscribed.filter(i => i!=id)
    },
    unsubscribeTransactions (state, arrIds) {
      state.subscribed = difference(state.subscribed, arrIds)
    }
  },
  actions: {
    getMempool ({ state, commit }) {
      axios.get('http://88.198.13.202:9052/transactions/unconfirmed')
        .then(response => {
          if(state.subscribed.length > 0){
            const passedTransactionsIds = differenceBy(state.mempool, response.data, 'id').map(i => i.id)
            const passedSubscribedTsIds = intersection(passedTransactionsIds, state.subscribed)
            if(passedSubscribedTsIds.length > 0) {
              commit('unsubscribeTransactions', passedSubscribedTsIds)
              passedSubscribedTsIds.map(item => {
                Vue.notification.show(item, {
                  body: 'Транзакцию, которую вы ожидали, была подтверждена'
                }, {})
              })
            }
          }
          commit('updateMempool', response.data)
        })
    },
    subscribeTransaction ({ commit }, id) {
      commit('addSubscribed', id)
    },
    unsubscribeTransaction ({ commit }, id) {
      commit('removeSubscribed', id)
    },
  }
})
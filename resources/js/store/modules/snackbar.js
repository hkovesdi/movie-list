const state = () => ({
  messages: []
})

const getters = {}

const actions = {}

const mutations = {
  add(state, message) {
    state.messages.push(message)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

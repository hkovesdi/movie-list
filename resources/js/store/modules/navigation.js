const state = () => ({
  drawer: false
})

const getters = {}

const mutations = {
  setDrawer(state, val) {
    state.drawer = val
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

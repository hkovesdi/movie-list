const state = () => ({
  drawer: false
})

const getters = {
  getDrawer(state) {
    return state.drawer
  }
}

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

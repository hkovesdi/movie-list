const state = () => ({
  drawer: {
    enabled: false,
    expanded: true
  }
})

const getters = {}

const mutations = {
  setDrawerEnabled(state, val) {
    state.drawer.enabled = val
  },
  setDrawerExpanded(state, val) {
    state.drawer.expanded = val
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

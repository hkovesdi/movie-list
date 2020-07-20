const state = () => ({
  drawer: {
    enabled: false,
    expanded: true
  },
  userMenuItems: [{ text: 'Sign Out', to: '/signout', icon: { code: 'mdi-logout' } }]
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

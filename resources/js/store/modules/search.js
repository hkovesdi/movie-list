const state = () => ({
  appBar: {
    searchField: {
      value: ''
    }
  },
  quickSearch: {
    enabled: false
  }
})

const getters = {}

const mutations = {
  setAppBarSearchFieldValue(state, val) {
    state.appBar.searchField.value = val
  },
  setQuickSearchEnabled(state, val) {
    state.quickSearch.enabled = val
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

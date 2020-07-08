const state = () => ({
    test: "test"
})

const getters = {
    getTest: (state) => {
        return state.test
    },
}

const actions = {
  changeTest ({commit}, value) {
      commit('setTest', value)
  }
}

const mutations = {
    setTest (state, val) {
        state.Test = val
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
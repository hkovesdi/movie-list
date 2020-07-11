const state = () => ({
  width: 0,
  height: 0
})

const getters = {
  getWidth: (state) => {
    return state.width
  },
  getHeight: (state) => {
    return state.height
  }
}

const actions = {}

const mutations = {
  setHeight(state, newHeight) {
    state.height = newHeight
  },
  setWidth(state, newWidth) {
    state.width = newWidth
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

const state = () => ({
  id: null,
  name: null,
  email: null,
  avatar: null
})

const getters = {}

const mutations = {
  setId(state, newId) {
    state.id = newId
  },
  setName(state, newName) {
    state.name = newName
  },
  setEmail(state, newEmail) {
    state.email = newEmail
  },
  setAvatar(state, newAvatar) {
    state.avatar = newAvatar
  }
}

const actions = {
  login({ commit }, { email }) {
    // Login with API then update state
    let apiResponse = {
      id: 0,
      name: 'Renkee',
      avatar: 'https://avatars0.githubusercontent.com/u/9366854?s=460&u=1db396607010e12ed52eae2ad75384fad9ae8391&v=4'
    }
    commit('setId', apiResponse.id)
    commit('setName', apiResponse.name)
    commit('setEmail', email)
    commit('setAvatar', apiResponse.avatar)
  },
  logout({ commit }) {
    commit('setId', null)
    commit('setName', null)
    commit('setEmail', null)
    commit('setAvatar', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import gql from 'graphql-tag'
import apolloObject from '../../plugins/vue-apollo'
const graphqlClient = apolloObject.defaultClient

const state = () => ({
  id: null,
  name: null,
  email: null,
  avatar: null
})

const getters = {
  isAuthenticated(state) {
    if (state.id !== null && state.name !== null && state.email !== null) return true
    return false
  }
}

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
  setAll({ commit }, { id, username, email, avatar }) {
    commit('setId', id)
    commit('setName', username)
    commit('setEmail', email)
    commit('setAvatar', avatar || 'https://avatars0.githubusercontent.com/u/9366854?s=460&u=1db396607010e12ed52eae2ad75384fad9ae8391&v=4')
  },
  async setOnFirstLoad({ dispatch }, user) {
    if (user !== null && user !== undefined && user !== '') {
      dispatch('setAll', user)
    }
  },
  async login({ dispatch }, { username, password }) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation loginMut($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            message
            user {
              id
              email
            }
          }
        }
      `,
      variables: {
        username,
        password
      }
    })

    if (response.data.login.message === 'Sucessfully logged in!') {
      const { id, email } = response.data.login.user
      dispatch('setAll', { id, username, email })
    }
  },
  async logout({ dispatch }) {
    dispatch('setAll', { id: null, username: null, email: null, avatar: null })

    await graphqlClient.mutate({
      mutation: gql`
        mutation logoutMut {
          logout {
            message
          }
        }
      `
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

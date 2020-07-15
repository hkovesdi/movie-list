import gql from 'graphql-tag'
import apolloObject from '../../plugins/vue-apollo'
const graphqlClient = apolloObject.defaultClient

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
  async tryFetchOnFirstLoad({ commit }) {
    const response = await graphqlClient.query({
      query: gql`
        query tryFetchUser {
          me {
            id
            username
            email
          }
        }
      `
    })
    console.log(response)
    if (response.data.me) {
      const { id, username, email } = response.data.me
      commit('setId', id)
      commit('setName', username)
      commit('setEmail', email)
      commit('setAvatar', 'https://avatars0.githubusercontent.com/u/9366854?s=460&u=1db396607010e12ed52eae2ad75384fad9ae8391&v=4')
    }
  },
  async login({ commit }, { username, password }) {
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
      commit('setId', id)
      commit('setName', username)
      commit('setEmail', email)
      commit('setAvatar', 'https://avatars0.githubusercontent.com/u/9366854?s=460&u=1db396607010e12ed52eae2ad75384fad9ae8391&v=4')
    }
  },
  async logout({ commit }) {
    await graphqlClient.mutate({
      mutation: gql`
        mutation logoutMut {
          logout {
            message
          }
        }
      `
    })

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

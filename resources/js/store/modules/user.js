import gql from 'graphql-tag'
import apolloObject from '../../plugins/vue-apollo'
const graphqlClient = apolloObject.defaultClient

const state = () => ({
  id: null,
  name: null,
  email: null,
  bio: null,
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
  setBio(state, newBio) {
    state.bio = newBio
  },
  setAvatar(state, newAvatar) {
    state.avatar = newAvatar
  }
}

const actions = {
  setAll({ commit }, { id, username, email, avatar, bio }) {
    commit('setId', id)
    commit('setName', username)
    commit('setEmail', email)
    commit('setBio', bio)
    commit('setAvatar', avatar)
  },
  async setOnFirstLoad({ dispatch }, user) {
    if (user !== null && user !== undefined && user !== '') {
      dispatch('setAll', user)
    }
  },
  async login({ dispatch }, { username, password }) {
    // Bypass GraphQL for now
    /*
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
    }*/
  },
  async register({ dispatch }, { username, email, password, passwordConfirm, bio, avatar }) {
    return graphqlClient
      .mutate({
        mutation: gql`
          mutation registerMut($username: String!, $password: String!, $confirm_password: String!, $email: Email!, $bio: String, $avatar: Upload) {
            register(
              input: { username: $username, password: $password, confirm_password: $confirm_password, email: $email, bio: $bio, avatar: $avatar }
            ) {
              id
              username
              email
              bio
              avatar
            }
          }
        `,
        variables: {
          username: username,
          password: password,
          confirm_password: passwordConfirm,
          email: email,
          bio: bio,
          avatar: avatar
        },
        errorPolicy: 'all',
        context: {
          hasUpload: true
        }
      })
      .catch((resp) => {
        console.log('Internal server error')
        console.log(resp)
      })
      .then((resp) => {
        if (resp.errors) {
          console.log('err')
          console.log(resp)
          if (resp.errors[0].extensions.category === 'validation') {
            Object.values(resp.errors[0].extensions.validation).forEach((errors) => {
              errors.forEach((error) => {
                console.log(error.replace('input.', ''))
              })
            })
          }
        } else {
          console.log('succ')
          console.log(resp)
          dispatch('setAll', resp.data.register)
        }
      })
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

import gql from 'graphql-tag'
import apolloObject from '../../plugins/vue-apollo'
import { handleGQLErrors } from '../../helpers/handleGQLErrors'
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
    let response = await graphqlClient
      .mutate({
        mutation: gql`
          mutation loginMut($username: String!, $password: String!) {
            login(username: $username, password: $password) {
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
          password: password
        },
        errorPolicy: 'all'
      })
      .catch(() => {
        throw new Error('Internal server error')
      })

    if (response.errors) {
      throw handleGQLErrors(response)
    } else if (!response.data.login) {
      throw ['Invalid username or password']
    } else {
      dispatch('setAll', response.data.login)
    }
  },
  async register({ dispatch }, { username, email, password, passwordConfirm, bio, avatar }) {
    let response = await graphqlClient
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
          username: username.value,
          email: email.value,
          password,
          confirm_password: passwordConfirm,
          bio,
          avatar
        },
        errorPolicy: 'all',
        context: {
          hasUpload: true
        }
      })
      .catch(() => {
        throw new Error('Internal server error')
      })

    if (response.errors) {
      throw handleGQLErrors(response)
    } else {
      dispatch('setAll', response.data.register)
    }
  },
  async logout({ dispatch, commit }) {
    dispatch('setAll', { id: null, username: null, email: null, bio: null, avatar: null })

    await graphqlClient.mutate({
      mutation: gql`
        mutation logoutMut {
          logout {
            message
          }
        }
      `
    })
    commit(
      'snackbar/add',
      {
        message: 'Successfully logged out!',
        color: 'green'
      },
      { root: true }
    )
  },
  async exists(_, { searchString, searchField }) {
    let response = await graphqlClient
      .query({
        query: gql`
          query doesUserExist($searchString: Mixed!, $searchField: UserSearchField!) {
            user(searchString: $searchString, searchField: $searchField) {
              username
            }
          }
        `,
        variables: {
          searchString,
          searchField
        },
        errorPolicy: 'all'
      })
      .catch(() => {
        throw new Error('Internal server error')
      })

    if (response.data.user === null) return true
    else return 'Already exists'
  },
  async addToMyMovieList({ dispatch }, input) {
    console.log(input)
    const pickedInput = _.pick(input, ['movie_id', 'status_id', 'rating', 'date_watched', 'times_rewatched', 'comment'])
    console.log(pickedInput)
    let response = await graphqlClient
      .mutate({
        mutation: gql`
          mutation addToMyMovieList($input: AddToMyMovieListInput!) {
            addToMyMovieList(input: $input) {
              id
              movie {
                title
                rating
              }
              rating
              status {
                id
                name
              }
              date_watched
              times_rewatched
              comment
            }
          }
        `,
        variables: {
          input: pickedInput
        },
        errorPolicy: 'all'
      })
      .catch(() => {
        throw new Error('Internal server error')
      })
    if (response.errors) {
      console.log(response.errors)
      throw handleGQLErrors(response)
    } else {
      //Dispatch action to mutate the users list locally
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

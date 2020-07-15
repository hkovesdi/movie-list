import gql from 'graphql-tag'
import apolloObject from '../../plugins/vue-apollo'
const graphqlClient = apolloObject.defaultClient

const state = () => ({
  movies: []
})

const getters = {}

const mutations = {
  setMovies(state, val) {
    state.movies = val
  }
}

const actions = {
  async fetchMovies({ commit }) {
    const response = await graphqlClient.query({
      query: gql`
        query fetchMovies {
          movies {
            data {
              id
              title
            }
          }
        }
      `
    })

    commit('setMovies', response.data.movies)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

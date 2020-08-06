<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="getItems" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
import returnIfExists from '../../../helpers/returnIfExists.js'
import gql from 'graphql-tag'

export default {
  data: () => ({
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Rating', value: 'rating' },
      { text: 'Rating (all users)', value: 'usersRating' },
      { text: 'Date watched', value: 'date' },
      { text: 'Times watched', value: 'times' },
      { text: 'Comment', value: 'comment' }
    ]
  }),
  computed: {
    getItems() {
      return this.user.userMovies.map((userMovie) => {
        return {
          title: userMovie.movie.title,
          rating: userMovie.rating,
          usersRating: userMovie.movie.users_rating,
          date: userMovie.date_watched,
          times: userMovie.times_rewatched,
          comment: userMovie.comment
        }
      })
    }
  },
  methods: {
    returnIfExists
  },
  apollo: {
    user: {
      query: gql`
        query user($searchString: Mixed!, $searchField: UserSearchField!) {
          user: user(searchString: $searchString, searchField: $searchField) {
            id
            username
            userMovies {
              times_rewatched
              status {
                name
              }
              rating
              comment
              date_watched
              movie {
                id
                title
                users_rating
              }
            }
          }
        }
      `,
      variables() {
        return {
          searchString: this.$route.params.name,
          searchField: 'USERNAME'
        }
      },
      update: (data) => data.user
    }
  }
}
</script>

<style lang="scss" scoped></style>

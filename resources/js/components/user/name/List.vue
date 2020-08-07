<template>
  <v-container fluid>
    <div class="d-flex flex-row flex-wrap">
      <div v-for="status in statuses" :key="status" class="mr-5">
        <h2 class="subheader font-weight-bold mb-3">
          {{ status }}
        </h2>
        <v-data-table
          style="max-width: 600px; border-radius: 4px; border: thin solid rgba(0, 0, 0, 0.12);"
          class="mb-10"
          :loading="$apollo.queries.user.loading"
          :headers="headers"
          :items="getItems(status)"
          :items-per-page="1"
          dense
          fixed-header
          disable-pagination
          hide-default-footer
        >
          <template #slot>
            kek
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>

<script>
import returnIfExists from '../../../helpers/returnIfExists.js'
import gql from 'graphql-tag'

export default {
  data: () => ({
    headers: [
      { text: 'Title', value: 'title', width: 250 },
      { text: 'Rating', value: 'rating', width: 85, align: 'right' },
      { text: 'Avg. rating', value: 'usersRating', width: 110, align: 'right' },
      { text: 'Comment', value: 'comment', width: 150 }
    ],
    statuses: ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped']
  }),
  methods: {
    returnIfExists,
    getItems(status) {
      if (!this.user || !this.user.userMovies) return []
      return this.user.userMovies
        .filter((userMovie) => userMovie.status.name === status)
        .map((userMovie) => {
          return {
            title: userMovie.movie.title,
            rating: userMovie.rating,
            usersRating: Math.round(userMovie.movie.users_rating),
            comment: userMovie.comment
          }
        })
    }
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

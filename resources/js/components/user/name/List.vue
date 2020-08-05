<template>
  <div>Hello! List</div>
</template>

<script>
import returnIfExists from '../../../helpers/returnIfExists.js'
import gql from 'graphql-tag'

export default {
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

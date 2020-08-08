<template>
  <div>Hello {{ user.username }}!</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  computed: {
    uuser() {
      return !this.$apollo.queries.user ? this.user : {}
    }
  },
  apollo: {
    user() {
      return {
        query: gql`
          query user($searchString: Mixed!, $searchField: UserSearchField!) {
            user: user(searchString: $searchString, searchField: $searchField) {
              id
              username
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
}
</script>

<style lang="scss" scoped></style>

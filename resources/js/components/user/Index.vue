<template>
  <div style="width: 100%; height: 100%;" class="outer-grid">
    <div class="secondary side-left">
      <v-btn tile small link exact :to="`/user/${$route.params.name}/`">Profile</v-btn>
      <v-btn tile small link exact :to="`/user/${$route.params.name}/list`">List</v-btn>
    </div>
    <div class="secondary d-flex bar-top">
      <v-avatar style="margin-left: 20px; margin-top: 20px;" height="135" width="135">
        <v-img :src="user && user.avatar" />
      </v-avatar>
      <div style="height: 150px; margin-top: 12.5px; margin-left: 20px; margin-right: 12px; width: 2px;" class="grey darken-2"></div>
      <div class="d-flex flex-column flex-nowrap justify-center">
        <div class="text-h4 white--text">{{ user && user.username }}</div>
        <div style="max-width: 200px; overflow-wrap: break-word;" class="text-body-2 grey--text text--lighten-1">
          {{ user && user.bio }}
        </div>
      </div>
    </div>
    <div class="main"><router-view /></div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    user() {
      return {
        query: gql`
          query user($searchString: Mixed!, $searchField: UserSearchField!) {
            user: user(searchString: $searchString, searchField: $searchField) {
              id
              username
              avatar
              bio
            }
          }
        `,
        fetchPolicy: 'network-only',
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

<style lang="scss" scoped>
.bar-top {
  grid-area: bar-top;
}
.side-left {
  grid-area: side-left;
}
.main {
  grid-area: main;
}
.outer-grid {
  display: grid;
  grid-template-columns: 56px auto;
  grid-template-rows: 175px auto;
  grid-template-areas:
    'bar-top bar-top'
    'side-left main';
}
</style>

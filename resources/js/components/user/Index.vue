<template>
  <div style="width: 100%; height: 100%;" :class="$route.params.name === $store.state.user.name ? 'outer-grid-loggedin-same' : 'outer-grid'">
    <div v-if="!($route.params.name === $store.state.user.name)" class="grey darken-2 side-left">
      <NavDrawerItemList :items="userItems" dark color="grey lighten-1" with-tooltips tooltip-color="warning" />
    </div>
    <div class="secondary d-flex bar-top">
      <v-avatar v-if="!$apollo.queries.user.loading" style="margin-left: 20px; margin-top: 20px;" height="135" width="135">
        <v-img :src="user && user.avatar" />
      </v-avatar>
      <v-skeleton-loader v-else dark class="avatar-skeleton" height="135" width="135" style="margin-left: 20px; margin-top: 20px;" type="avatar" />
      <div style="height: 150px; margin-top: 12.5px; margin-left: 20px; margin-right: 12px; width: 2px;" class="grey darken-2"></div>
      <div v-if="!$apollo.queries.user.loading" class="d-flex flex-column flex-nowrap justify-center">
        <div class="text-h4 white--text">{{ user && user.username }}</div>
        <div style="max-width: 200px; overflow-wrap: break-word;" class="text-body-2 grey--text text--lighten-1">
          {{ user && user.bio }}
        </div>
      </div>
      <div v-else class="d-flex flex-column flex-nowrap justify-center">
        <v-skeleton-loader dark height="40" width="300" type="heading"></v-skeleton-loader>
        <v-skeleton-loader dark height="25" width="200" type="text"></v-skeleton-loader>
        <v-skeleton-loader dark height="25" width="200" type="text"></v-skeleton-loader>
      </div>
    </div>
    <div class="main"><router-view /></div>
  </div>
</template>

<script>
import NavDrawerItemList from '../layout/NavDrawerItemList.vue'
import gql from 'graphql-tag'
export default {
  components: {
    NavDrawerItemList
  },
  computed: {
    userItems() {
      return [
        { text: 'Profile', to: `/user/${this.$route.params.name}`, icon: { code: 'mdi-view-dashboard' } },
        { text: 'List', to: `/user/${this.$route.params.name}/list`, icon: { code: 'mdi-view-list' } }
      ]
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

<style lang="scss">
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
.outer-grid-loggedin-same {
  display: grid;
  grid-template-rows: 175px auto;
  grid-template-areas:
    'bar-top'
    'main';
}
.avatar-skeleton .v-skeleton-loader__avatar {
  height: 100% !important;
  width: 100% !important;
}
</style>

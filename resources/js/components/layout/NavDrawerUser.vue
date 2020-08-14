<template>
  <v-list subheader class="pb-0">
    <v-list-group v-if="loggedIn && windowWidthAboveBreakpoint('xs')" id="user-section">
      <template v-slot:prependIcon>
        <v-avatar :class="drawerExpanded ? 'mt-2' : ''" class="user-icon" :size="drawerExpanded ? '116' : '36'">
          <v-img :src="user.avatar || defaultAvatar" />
        </v-avatar>
      </template>
      <template v-if="drawerExpanded" v-slot:activator>
        <v-list-item-content class="pb-2">
          <v-list-item-title class="title text--primary text-h5">{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <template v-if="drawerExpanded" v-slot:appendIcon>
        <v-icon class="text--primary">mdi-chevron-down</v-icon>
      </template>

      <NavDrawerItemList :items="$store.state.navigation.userMenuItems" :with-tooltips="windowWidthAboveBreakpoint('xs') && !drawerExpanded" />
    </v-list-group>
    <template v-if="!loggedIn && windowWidthAboveBreakpoint('xs')">
      <LoginLogoutItems />
    </template>

    <v-divider v-if="loggedIn" />
    <NavDrawerItemList v-if="loggedIn" :items="userItems" :with-tooltips="windowWidthAboveBreakpoint('xs') && !drawerExpanded" />
  </v-list>
</template>

<script>
import widthBreakpoint from '../mixins/widthbreakpoint.js'
import NavDrawerItemList from './NavDrawerItemList.vue'
import LoginLogoutItems from './LoginLogoutItems.vue'
export default {
  components: {
    NavDrawerItemList,
    LoginLogoutItems
  },
  mixins: [widthBreakpoint],
  data: () => ({
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png'
  }),
  computed: {
    drawerExpanded: {
      get() {
        return this.$store.state.navigation.drawer.expanded
      },
      set(val) {
        this.$store.commit('navigation/setDrawerExpanded', val)
      }
    },
    user() {
      return this.$store.state.user
    },
    loggedIn() {
      return this.$store.getters['user/isAuthenticated']
    },
    userItems() {
      return [
        { text: 'Profile', to: `/user/${this.user.name}`, icon: { code: 'mdi-view-dashboard' } },
        { text: 'My List', to: `/user/${this.user.name}/list`, icon: { code: 'mdi-view-list' } },
        { text: 'Friends', to: '/friends', icon: { code: 'mdi-account-multiple' } }
      ]
    }
  }
}
</script>

<style lang="scss">
#user-section {
  .v-list-group__header {
    flex-direction: column;
    min-height: 0px;

    .v-list-group__header__prepend-icon {
      align-self: center;
      margin-right: 0px;
      margin-bottom: 16px;

      .user-icon {
        transition: all 0.225s;
        border-radius: 500px;
        -webkit-border-radius: 500px;
        -moz-border-radius: 500px;
      }
    }
    .v-list-item__content {
      flex-direction: column;
      padding-top: 0px;
    }
    .v-list-group__header__append-icon {
      justify-content: center;
      padding-top: 4px;
      padding-bottom: 8px;
    }
  }
}
</style>

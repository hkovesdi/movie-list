<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :expand-on-hover="windowWidthAboveBreakpoint('xs')"
    :permanent="windowWidthAboveBreakpoint('xs')"
    clipped
    app
  >
    <v-list subheader>
      <v-list-group v-if="loggedIn" append-icon="far fa-chevron-up">
        <template v-slot:activator>
          <v-list-item id="nav-user-list-item" two-line>
            <v-list-item-avatar>
              <v-img :src="user.avatar || defaultAvatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <NavDrawerItemList :items="userItems" />
      </v-list-group>
      <NavDrawerItemList v-else :items="notLoggedInItems" />
      <v-divider></v-divider>
      <NavDrawerItemList :items="navItems" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import widthBreakpoint from '../mixins/widthbreakpoint.js'
import NavDrawerItemList from './NavDrawerItemList.vue'
export default {
  components: {
    NavDrawerItemList
  },
  mixins: [widthBreakpoint],
  data: () => ({
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png',
    notLoggedInItems: [
      {
        text: 'Register',
        to: '/register',
        icon: {
          code: 'fas fa-user-plus',
          size: '18',
          custom_css: 'left: 3px;'
        }
      },
      { text: 'Log in', to: '/login', icon: { code: 'fas fa-sign-in-alt', size: '21' } }
    ],
    navItems: [
      { text: 'Home', to: '/', icon: { code: 'fas fa-home', size: '19' } },
      { text: 'Top Movies', to: '/top', icon: { code: 'fas fa-award', size: '21' } }
    ]
  }),
  computed: {
    drawerModel: {
      get() {
        return this.$store.state.navigation.drawer
      },
      set(val) {
        this.$store.commit('navigation/setDrawer', val)
      }
    },
    user() {
      return this.$store.state.user
    },
    loggedIn() {
      return this.user.id !== null
    },
    userItems() {
      return [
        { text: 'Profile', to: `/user/${this.user.name}`, icon: { code: 'fas fa-user-circle', size: '23' } },
        { text: 'My List', to: `/user/${this.user.name}/list`, icon: { code: 'fas fa-list', size: '19' } },
        { text: 'Friends', to: '/friends', icon: { code: 'fas fa-users', size: '18' } },
        { text: 'Sign Out', dispatch: 'user/logout', icon: { code: 'fas fa-sign-out', size: '21' } }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-user-list-item {
  $shift_amount: 8px;
  $base_padding: 16px;

  height: 66px;
  .v-avatar {
    margin-left: (-$shift_amount) - $base_padding;
    margin-right: $base_padding + $shift_amount;
  }
}
</style>

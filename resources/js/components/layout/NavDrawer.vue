<template>
  <v-navigation-drawer
    v-model="drawerModel"
    width="275"
    :mini-variant="windowWidthAboveBreakpoint('xs') && !drawerExpanded"
    :permanent="windowWidthAboveBreakpoint('xs')"
    clipped
    app
  >
    <v-list subheader>
      <v-list-group v-if="loggedIn" value="true">
        <template v-slot:prependIcon>
          <v-avatar class="user-icon" :size="drawerExpanded ? '48' : '24'">
            <v-img :src="user.avatar || defaultAvatar" />
          </v-avatar>
        </template>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <NavDrawerItemList :items="userItems" />
      </v-list-group>
      <NavDrawerItemList v-else :items="notLoggedInItems" />
      <v-divider></v-divider>
      <NavDrawerItemList :items="navItems" />
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item v-if="windowWidthAboveBreakpoint('xs')" dense link @click="toggleDrawerExpansion()">
          <v-list-item-icon>
            <v-icon :class="drawerExpanded ? 'collapse--active' : ''" class="collapse">mdi-arrow-expand-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Collapse
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
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
          code: 'mdi-account-plus'
        }
      },
      { text: 'Log in', to: '/login', icon: { code: 'mdi-login' } }
    ],
    navItems: [
      { text: 'Home', to: '/', icon: { code: 'mdi-home' } },
      { text: 'Top Movies', to: '/top', icon: { code: 'mdi-star' } }
    ]
  }),
  computed: {
    drawerExpanded() {
      return this.$store.state.navigation.drawer.expanded
    },
    drawerModel: {
      get() {
        return this.$store.state.navigation.drawer.enabled
      },
      set(val) {
        this.$store.commit('navigation/setDrawerEnabled', val)
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
        { text: 'Profile', to: `/user/${this.user.name}`, icon: { code: 'mdi-view-dashboard' } },
        { text: 'My List', to: `/user/${this.user.name}/list`, icon: { code: 'mdi-view-list' } },
        { text: 'Friends', to: '/friends', icon: { code: 'mdi-account-multiple' } },
        { text: 'Sign Out', dispatch: 'user/logout', icon: { code: 'mdi-logout' } }
      ]
    }
  },
  methods: {
    toggleDrawerExpansion() {
      this.$store.commit('navigation/setDrawerExpanded', !this.drawerExpanded)
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse--active {
  transform: rotate(-180deg);
}
.collapse {
  transition: transform 0.3s;
}
.user-icon {
  transition: all 0.2s;
}
.v-list-item__icon.v-list-group__header__prepend-icon {
  margin-right: 0 !important;
}
</style>

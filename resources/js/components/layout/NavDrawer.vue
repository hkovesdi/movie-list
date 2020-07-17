<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :mini-variant="windowWidthAboveBreakpoint('xs') && !drawerExpanded"
    :permanent="windowWidthAboveBreakpoint('xs')"
    clipped
    app
  >
    <v-list subheader class="pb-0">
      <v-list-group v-if="loggedIn" id="user-section">
        <template v-slot:prependIcon>
          <v-avatar :class="drawerExpanded ? 'mt-2' : ''" class="user-icon" :size="drawerExpanded ? '116' : '36'">
            <v-img :src="user.avatar || defaultAvatar" />
          </v-avatar>
        </template>
        <template v-if="drawerExpanded" v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="title text--primary text-h5 font-weight-bold">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle class="subtitle pt-1">16 movies to watch</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template v-if="drawerExpanded" v-slot:appendIcon>
          <v-icon class="text--primary">mdi-chevron-down</v-icon>
        </template>
        <NavDrawerItemList :items="userMenuItems" />
      </v-list-group>
      <v-divider />
    </v-list>
    <v-list subheader>
      <NavDrawerItemList v-if="!loggedIn" :items="notLoggedInItems" />
      <v-divider v-if="!loggedIn" />
      <NavDrawerItemList v-if="loggedIn" :items="userItems" />
      <v-divider v-if="loggedIn" />
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
    ],
    userMenuItems: [{ text: 'Sign Out', to: '/signout', icon: { code: 'mdi-logout' } }]
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
      return this.$store.getters['user/isAuthenticated']
    },
    userItems() {
      return [
        { text: 'Profile', to: `/user/${this.user.name}`, icon: { code: 'mdi-view-dashboard' } },
        { text: 'My List', to: `/user/${this.user.name}/list`, icon: { code: 'mdi-view-list' } },
        { text: 'Friends', to: '/friends', icon: { code: 'mdi-account-multiple' } }
      ]
    }
  },
  created() {
    // Load in drawer expansion preference from localstorage
    this.drawerExpanded = localStorage.getItem('drawerExpanded') === 'false'
  },
  methods: {
    toggleDrawerExpansion() {
      this.drawerExpanded = !this.drawerExpanded
      localStorage.setItem('drawerExpanded', !this.drawerExpanded)
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
  transition: all 0.225s;
}
.v-list-item__icon.v-list-group__header__prepend-icon {
  margin-right: 0 !important;
}
</style>

<style lang="scss">
#user-section {
  .v-list-group__header {
    flex-direction: column;
    min-height: 0px;

    .v-list-group__header__prepend-icon {
      align-self: center;
      margin-right: 0px;

      .user-icon {
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

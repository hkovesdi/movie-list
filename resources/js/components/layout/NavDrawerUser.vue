<template>
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
    <template v-if="!loggedIn">
      <v-list-item link color="primary" @click.stop="$store.commit('modals/setRegisterEnabled', true)">
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Register
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link color="primary" @click.stop="$store.commit('modals/setLoginEnabled', true)">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Login
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider v-if="loggedIn" />
    <NavDrawerItemList v-if="loggedIn" :items="userItems" />
  </v-list>
</template>

<script>
import NavDrawerItemList from './NavDrawerItemList.vue'
export default {
  components: {
    NavDrawerItemList
  },
  data: () => ({
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png',
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
  background-color: #fafafa;
  .v-list-group__header {
    flex-direction: column;
    min-height: 0px;

    .v-list-group__header__prepend-icon {
      align-self: center;
      margin-right: 0px;

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
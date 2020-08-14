<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :mini-variant="windowWidthAboveBreakpoint('xs') && !drawerExpanded"
    :permanent="windowWidthAboveBreakpoint('xs')"
    width="225"
    clipped
    app
  >
    <NavDrawerUser />
    <v-list subheader>
      <v-divider />
      <NavDrawerItemList :items="navItems" :with-tooltips="windowWidthAboveBreakpoint('xs') && !drawerExpanded" />
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
import NavDrawerUser from './NavDrawerUser.vue'
import NavDrawerItemList from './NavDrawerItemList.vue'
export default {
  components: {
    NavDrawerUser,
    NavDrawerItemList
  },
  mixins: [widthBreakpoint],
  data: () => ({
    navItems: [
      { text: 'Home', to: '/', icon: { code: 'mdi-home' } },
      { text: 'Top Movies', to: '/top', icon: { code: 'mdi-star' } },
      { text: 'Search', to: '/search', icon: { code: 'mdi-magnify' } }
    ]
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
    loggedIn() {
      return this.$store.getters['user/isAuthenticated']
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
</style>

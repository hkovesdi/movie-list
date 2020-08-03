<template>
  <v-app>
    <AppBar />
    <NavDrawer />

    <!-- Modals -->
    <Login />
    <Register />
    <QuickSearch />

    <!-- Overlay for QuickSearch -->
    <v-overlay z-index="4" :value="$store.state.search.quickSearch.enabled"></v-overlay>

    <v-snackbars :objects.sync="$store.state.snackbar.messages" :timeout="3000" top right></v-snackbars>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './layout/AppBar.vue'
import NavDrawer from './layout/NavDrawer.vue'
import Login from './layout/modals/Login.vue'
import Register from './layout/modals/Register.vue'
import QuickSearch from './layout/modals/QuickSearch.vue'
import VSnackbars from 'v-snackbars'
export default {
  components: {
    AppBar,
    NavDrawer,
    Login,
    Register,
    QuickSearch,
    'v-snackbars': VSnackbars
  },
  data: () => ({
    messages: []
  }),
  mounted() {
    let resizeHandler = () => {
      this.$store.commit('window/setWidth', window.innerWidth)
      this.$store.commit('window/setHeight', window.innerHeight)
    }
    window.onresize = resizeHandler
    window.onload = resizeHandler
  }
}
</script>

<style lang="scss">
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>

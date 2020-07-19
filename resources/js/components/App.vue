<template>
  <v-app>
    <AppBar />
    <NavDrawer />

    <!-- Modals -->
    <Login />
    <Register />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './layout/AppBar.vue'
import NavDrawer from './layout/NavDrawer.vue'
import Login from './layout/modals/Login.vue'
import Register from './layout/modals/Register.vue'
export default {
  components: {
    AppBar,
    NavDrawer,
    Login,
    Register
  },
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

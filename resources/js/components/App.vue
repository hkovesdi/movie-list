<template>
  <v-app>
    <NavDrawer />
    <AppBar />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './layout/AppBar.vue'
import NavDrawer from './layout/NavDrawer.vue'
export default {
  components: {
    AppBar,
    NavDrawer
  },
  async created() {
    await this.$store.dispatch('user/tryFetchOnFirstLoad')
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

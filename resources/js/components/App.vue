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
  }
}
</script>

<template>
  <v-dialog v-model="state" max-width="290">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>Let Google help apps determine location.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="state = false">Disagree</v-btn>
        <v-btn color="primary darken-1" text @click="state = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    state: {
      get() {
        return this.$store.state.modals.login.enabled
      },
      set(val) {
        this.$store.commit('modals/setLoginEnabled', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

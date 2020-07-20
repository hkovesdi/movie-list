<template>
  <v-dialog v-model="state" :fullscreen="!windowWidthAboveBreakpoint('xs')" max-width="400" transition="dialog-bottom-transition">
    <v-card tile>
      <v-toolbar class="mb-6" flat dark color="primary">
        <v-btn icon @click="state = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form ref="loginForm" v-model="valid">
        <v-card-text>
          <v-text-field v-model="username" :rules="atLeastThreeCharacters" type="text" label="Username" outlined autofocus></v-text-field>
          <v-text-field v-model="password" :rules="atLeastThreeCharacters" :type="showPassword ? 'text' : 'password'" label="Password" outlined>
            <template v-slot:append>
              <v-icon tabindex="-1" @click="showPassword = !showPassword" v-text="showPassword ? 'mdi-eye' : 'mdi-eye-off'"></v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn text @click="state = false">Cancel</v-btn>
          <v-btn type="submit" color="primary" :loading="loading" :disabled="loading" @click.prevent="login">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import widthBreakpoint from '../../mixins/widthbreakpoint.js'
export default {
  mixins: [widthBreakpoint],
  data: () => ({
    valid: '',
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    atLeastThreeCharacters: [(v) => (v || '').length >= 3 || 'Minimum 3 characters']
  }),
  computed: {
    state: {
      get() {
        return this.$store.state.modals.login.enabled
      },
      set(val) {
        this.$store.commit('modals/setLoginEnabled', val)
      }
    }
  },
  methods: {
    resetState() {
      this.username = ''
      this.password = ''
    },
    async login() {
      this.$refs.loginForm.validate()
      if (this.loading || !this.valid) return // Prevent spamming enter on form

      this.loading = true
      await this.$store.dispatch('user/login', { username: this.username, password: this.password })
      this.loading = false
      this.state = false

      // On successful login reset everything
      this.resetState()
      this.$refs.loginForm.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-dialog
    v-model="state"
    :fullscreen="!windowWidthAboveBreakpoint('xs')"
    max-width="400"
    :transition="windowWidthAboveBreakpoint('xs') ? 'scale-transition' : 'dialog-bottom-transition'"
  >
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert v-for="errorMessage in $store.state.modals.login.errors" :key="errorMessage" type="error" tile class="ma-0">
        {{ errorMessage }}
      </v-alert>
      <v-form ref="loginForm" v-model="valid" class="mt-6">
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
          <v-btn type="submit" color="primary" :loading="loading" :disabled="!valid || loading" @click.prevent="login">Login</v-btn>
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
      try {
        await this.$store.dispatch('user/login', { username: this.username, password: this.password })
      } catch (err) {
        if (err instanceof Error) {
          this.setErrors([err.message])
        } else {
          this.setErrors(err)
        }
        this.loading = false
        return
      }
      this.setErrors([])
      this.loading = false
      this.state = false

      // On successful login reset everything
      this.resetState()
      this.$refs.loginForm.resetValidation()
      this.$store.commit('snackbar/add', {
        message: 'Successfully logged in!',
        color: 'green'
      })
    },
    setErrors(errors) {
      this.$store.commit('modals/setLoginErrors', errors)
    }
  }
}
</script>

<style lang="scss" scoped></style>

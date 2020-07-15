<template>
  <div>
    <v-text-field v-model="username" type="text" label="Username"></v-text-field>
    <v-text-field v-model="password" type="password" label="Password"></v-text-field>
    <v-btn @click="login()">Login</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    login() {
      this.$store.dispatch('user/login', { username: this.username, password: this.password })
    }
  }
}
</script>

<style lang="scss" scoped></style>

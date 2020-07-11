<template>
  <div><v-btn @click="login('rene@renkee.eu', 'asd123')">Login</v-btn></div>
</template>

<script>
export default {
  methods: {
    login(email, password) {
      this.$store.dispatch('user/login', { email, password })
    }
  }
}
</script>

<style lang="scss" scoped></style>

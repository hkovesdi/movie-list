<template>
  <v-container fluid>
    <span>Friends</span>
    <v-btn @click="$store.dispatch('movies/fetchMovies')">Call asd action</v-btn>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

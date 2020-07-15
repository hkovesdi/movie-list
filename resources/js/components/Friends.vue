<template>
  <div>
    <span>Friends</span>
    <v-btn @click="$store.dispatch('movies/fetchMovies')">Call asd action</v-btn>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

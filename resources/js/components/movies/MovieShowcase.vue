<template>
  <div v-dragscroll.x class="outer">
    <div v-for="movie in movies" :key="movie.title" class="inner">
      <a href="#">
        <v-img height="300" contain :src="movie.img_url" />
      </a>
    </div>
  </div>
</template>
<script>
import { dragscroll } from 'vue-dragscroll'
export default {
  directives: {
    dragscroll
  },
  props: {
    movies: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="scss">
.outer {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 326px;
  padding: 4px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  .inner {
    max-width: 200px;
    flex: 0 0 auto;
    margin-right: 12px;
  }
}
</style>

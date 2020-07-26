<template>
  <div v-dragscroll.x class="outer">
    <div v-for="movie in movies" :key="movie.title" style="position: relative;" class="inner">
      <div style="height: 108px; width: 72.8px;"></div>
      <div style="line-height: 1.3;" class="showcase-title subtitle-1 font-weight-bold mb-1 mt-2 px-1">{{ movie.title }}</div>
      <div style="line-height: 1.3; height: 90px; overflow-y: auto;" class="showcase-desc body-2 px-1">{{ movie.description }}</div>
      <v-btn class="showcase-button" style="position: absolute; bottom: 0; left: 0; right: 0;" outlined color="primary">Learn more</v-btn>
      <v-img style="position: absolute; top: 0; left: 0;" class="poster" height="270" contain :src="movie.img_url" />
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
    width: 182px;
    height: 270px;
    flex: 0 0 auto;
    margin-right: 12px;
  }
}
.poster {
  transform-origin: 8px 8px;
  transition: transform 0.3s;
}
.showcase-title,
.showcase-desc,
.showcase-button {
  opacity: 0;
  width: 100%;
  transition: opacity 0.3s;
}
.inner:hover {
  .poster {
    transform: scale(0.4, 0.4);
  }
  .showcase-title,
  .showcase-desc,
  .showcase-button {
    opacity: 1;
  }
}
</style>

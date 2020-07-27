<template>
  <div v-dragscroll.x class="outer">
    <div v-for="movie in movies" :key="movie.title" style="position: relative;" class="inner">
      <!--<div style="display: inline-block; height: 108px; width: 72.8px; margin-top: 4px; margin-left: 4px;"></div>
      <div style="display: inline; height: 108px; width: 100px;">asd</div>
      <div style="line-height: 1.3;" class="showcase-title subtitle-1 font-weight-bold mb-1 mt-2 px-1">{{ movie.title }}</div>
      <div style="line-height: 1.3; height: 90px; overflow-y: auto;" class="showcase-desc body-2 px-1">{{ movie.description }}</div>
      <v-btn class="showcase-button" style="position: absolute; bottom: 0; left: 0; right: 0;" outlined color="primary">Learn more</v-btn>-->
      <!--<div class="movie-grid">
        <div class="grid-poster"></div>
        <div class="grid-user_rating ">{{ movie.users_rating }}</div>
        <div class="grid-rated">{{ movie.rating }}</div>
        <div class="grid-year">{{ movie.year }}</div>
        <div class="grid-runtime">{{ movie.runtime }}</div>
        <div class="grid-title">{{ movie.title }}</div>
        <div class="grid-desc">{{ movie.description }}</div>
        <div class="grid-button">
          <v-btn class="showcase-button" outlined color="primary">Learn more</v-btn>
        </div>
      </div>-->
      <v-card ripple link class="d-flex flex-column" outlined style="width: 182px; height: 269px; user-select: none;">
        <v-card-title style="line-height: 1.25;" class="text-subtitle-2 font-weight-bold text--primary">
          {{ movie.title | truncate(50, '...') }}
        </v-card-title>
        <v-card-subtitle style="line-height: 1.25;" class="text-caption">{{ movie.tagline | truncate(40, '...') }}</v-card-subtitle>
        <v-card-text style="line-height: 1.3; max-height: 105px; overflow: hidden;" class="text--primary text-body-2">
          {{ movie.description | truncate(100, '...') }}
        </v-card-text>
        <v-spacer />
        <v-card-actions class="d-flex justify-space-around align-center">
          <div class="text--primary text-body-2">{{ movie.year }}</div>
          <div class="text--primary text-body-2">{{ movie.runtime }} min</div>
          <div class="text--primary text-body-2">{{ movie.users_rating }}/10</div>
        </v-card-actions>
      </v-card>

      <v-img style="position: absolute; top: 0; left: 0; pointer-events: none;" class="poster rounded" height="270" contain :src="movie.img_url" />
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
export default {
  directives: {
    dragscroll
  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length).trim() + suffix
      } else {
        return text
      }
    }
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
.movie-grid {
  height: 270px;
  width: 182px;
  display: grid;
  grid-template-columns: 40% 30% 30%;
  grid-template-rows: 20% 20% 10% auto 36px;
  grid-template-areas:
    'poster runtime year'
    'poster rated   user_rating'
    'title  title   title'
    'desc   desc    desc'
    'button button  button';
  .grid-poster {
    grid-area: poster;
  }
  .grid-user_rating {
    grid-area: user_rating;
  }
  .grid-runtime {
    grid-area: runtime;
  }
  .grid-year {
    grid-area: year;
  }
  .grid-rated {
    grid-area: rated;
  }
  .grid-title {
    grid-area: title;
    font-weight: bold;
    line-height: 1.2;
  }
  .grid-desc {
    line-height: 1.3;
    overflow: hidden;
    grid-area: desc;
  }
  .grid-button {
    grid-area: button;
  }
}
.outer {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 326px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  .inner {
    width: 182px;
    height: 270px;
    flex: 0 0 auto;
    margin-right: 24px;
  }
}
.poster {
  transform-origin: top left;
  transition: opacity 0.3s cubic-bezier(0.34, 0.01, 0.03, 1.05);
  opacity: 1;
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
    opacity: 0;
  }
  .showcase-title,
  .showcase-desc,
  .showcase-button {
    opacity: 1;
  }
}
</style>

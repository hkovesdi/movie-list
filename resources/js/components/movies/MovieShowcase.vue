<template>
  <div v-dragscroll.x class="outer">
    <div v-for="movie in movies" :key="movie.title" class="inner">
      <v-card ripple link class="d-flex flex-column movie-card" outlined>
        <v-card-title class="text-subtitle-2 font-weight-bold text--primary movie-card-title">
          <v-clamp :max-lines="3">{{ movie.title }}</v-clamp>
        </v-card-title>
        <v-card-subtitle class="text-caption movie-card-tagline">
          <v-clamp :max-lines="2">{{ movie.tagline }}</v-clamp>
        </v-card-subtitle>
        <v-card-text class="text--primary text-body-2 movie-card-description">
          <v-clamp :max-lines="8">{{ movie.description }}</v-clamp>
        </v-card-text>
        <v-spacer />
        <v-card-actions class="movie-card-additional">
          <!--<div class="white--text text-caption font-weight-bold">{{ movie.year }}</div>
          <div class="white--text text-caption font-weight-bold">{{ movie.runtime }}<span style="font-size: 0.8em;"> min</span></div>
          <div class="white--text text-caption font-weight-bold">{{ movie.users_rating }}<span style="font-size: 0.7em;">/10</span></div>-->
          <v-chip small :class="calculateChipColor(movie.users_rating)" class="mr-1">
            <v-icon left size="15" style="color: white;">mdi-star-outline</v-icon>
            {{ movie.users_rating }}
          </v-chip>
          <v-chip small class="primary mr-1">
            <v-icon left size="15" style="color: white;">mdi-calendar-clock</v-icon>
            {{ movie.year }}
          </v-chip>
          <v-chip small class="primary"
            ><v-icon left size="15" style="color: white;">mdi-clock-time-eight-outline</v-icon> {{ movie.runtime }} m</v-chip
          >
        </v-card-actions>
      </v-card>

      <v-img class="poster rounded" height="310" width="210" contain :src="movie.img_url" />
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import VClamp from 'vue-clamp'
export default {
  components: {
    'v-clamp': VClamp
  },
  directives: {
    dragscroll
  },
  props: {
    movies: {
      required: true,
      type: Array
    }
  },
  methods: {
    calculateChipColor(rating) {
      //return rating > 6 ? 'success' : rating > 4 ? 'blue-grey lighten-2 white--text' : 'error'
      const colorClasses = [
        'teal darken-2',
        'red darken-3',
        'deep-orange darken-3',
        'deep-orange',
        'orange darken-2',
        'amber darken-2',
        'light-green darken-1',
        'light-green darken-1',
        'green',
        'green darken-1',
        'green darken-3'
      ]
      return colorClasses[Math.floor(rating)] + ' white--text'
    }
  }
}
</script>

<style lang="scss">
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
.outer {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 310px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;

  .inner {
    height: 310px;
    width: 210px;
    flex: 0 0 auto;
    margin-right: 18px;
    position: relative;

    .movie-card {
      width: 210px;
      height: 309px;
      user-select: none;

      .movie-card-title {
        line-height: 1.15;
        hyphens: auto;
      }

      .movie-card-tagline {
        line-height: 1.25;
        padding-bottom: 8px;
      }

      .movie-card-description {
        line-height: 1.3;
        overflow: hidden;
        hyphens: auto;
      }

      .movie-card-additional {
        height: 42px;
      }
    }

    .poster {
      transform-origin: top left;
      transition: opacity 0.3s cubic-bezier(0.34, 0.01, 0.03, 1.05);
      opacity: 1;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    &:hover {
      .poster {
        opacity: 0;
      }
    }
  }
}
</style>

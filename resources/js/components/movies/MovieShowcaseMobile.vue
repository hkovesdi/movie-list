<template>
  <v-list v-if="movies.length" three-line>
    <v-list-item v-for="movie in movies" :key="movie.id" link ripple :to="{ name: 'Movie', params: { id: movie.id } }" @click="additionalFunction">
      <v-list-item-avatar size="80" tile>
        <v-avatar size="80" tile>
          <v-img aspect-ratio="1.4725" contain :src="movie.img_url"></v-img>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="movie.title"></v-list-item-title>
        <v-list-item-subtitle class="text-caption" v-text="movie.tagline"></v-list-item-subtitle>
        <v-list-item-subtitle v-text="movie.description"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action class="d-flex justify-center align-self-center">
        <v-avatar tile size="40" :class="calculateChipColor(movie.users_rating)" class="white--text">
          {{ movie.users_rating }}
        </v-avatar>
      </v-list-item-action>
    </v-list-item>
  </v-list>
  <v-list v-else>
    <v-list-item v-for="index in 7" :key="index">
      <v-list-item-avatar size="80" tile>
        <v-avatar size="80" tile>
          <v-skeleton-loader tile loading type="image" :width="80 * 0.67" :height="80" />
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-skeleton-loader loading :max-width="150" type="text" />
        <v-skeleton-loader loading :max-width="130" type="text" />
        <v-skeleton-loader loading type="text" />
        <v-skeleton-loader loading type="text" />
      </v-list-item-content>
      <v-list-item-action class="d-flex justify-center align-self-center">
        <v-avatar tile size="40">
          <v-skeleton-loader tile loading type="image" :width="40" :height="40" />
        </v-avatar>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import calculateChipColor from '../../helpers/calculateRatingColor'
export default {
  props: {
    movies: {
      required: true,
      type: Array
    },
    additionalFunction: {
      required: false,
      type: Function,
      default: () => {}
    }
  },
  methods: {
    calculateChipColor
  }
}
</script>

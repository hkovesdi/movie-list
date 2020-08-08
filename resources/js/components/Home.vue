<template>
  <v-container v-if="windowWidthAboveBreakpoint('xs')" fluid>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2 ml-10">
        Most recent
      </h1>
      <MovieShowcase :movies="mostRecent || []" :list-id="0" />
    </div>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2 ml-10">
        Top rated
      </h1>
      <MovieShowcase :movies="topRated || []" :list-id="1" />
    </div>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2 ml-10">
        Very important
      </h1>
      <MovieShowcase :movies="veryImportant || []" :list-id="2" />
    </div>
  </v-container>
  <div v-else>
    <v-expansion-panels class="movie-showcase-mobile-expansion-panel" accordion flat :value="0">
      <v-expansion-panel @change="scrollToTop">
        <v-expansion-panel-header>Most recent</v-expansion-panel-header>
        <v-expansion-panel-content>
          <MovieShowcaseMobile :movies="mostRecent || []" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @change="scrollToTop">
        <v-expansion-panel-header>Top rated</v-expansion-panel-header>
        <v-expansion-panel-content>
          <MovieShowcaseMobile :movies="topRated || []" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @change="scrollToTop">
        <v-expansion-panel-header>Very important</v-expansion-panel-header>
        <v-expansion-panel-content>
          <MovieShowcaseMobile :movies="veryImportant || []" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import widthBreakpoint from './mixins/widthbreakpoint.js'
import MovieShowcase from './movies/MovieShowcase'
import MovieShowcaseMobile from './movies/MovieShowcaseMobile'
import gql from 'graphql-tag'

export default {
  components: {
    MovieShowcase,
    MovieShowcaseMobile
  },
  mixins: [widthBreakpoint],
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  apollo: {
    mostRecent() {
      return {
        query: gql`
          query mostRecent {
            mostRecent: movies(searchMode: ALL, page: 1) {
              data {
                id
                title
                img_url
                users_rating
                description
                rating
                year
                runtime
                tagline
                high_res_poster_url
              }
            }
          }
        `,
        update: (data) => data.mostRecent.data
      }
    },
    topRated() {
      return {
        query: gql`
          query topRated {
            topRated: movies(searchMode: ALL, page: 2) {
              data {
                id
                title
                img_url
                users_rating
                description
                rating
                year
                runtime
                tagline
                high_res_poster_url
              }
            }
          }
        `,
        update: (data) => data.topRated.data
      }
    },
    veryImportant() {
      return {
        query: gql`
          query veryImportant {
            veryImportant: movies(searchMode: ALL, page: 3) {
              data {
                id
                title
                img_url
                users_rating
                description
                rating
                year
                runtime
                tagline
                high_res_poster_url
              }
            }
          }
        `,
        update: (data) => data.veryImportant.data
      }
    }
  }
}
</script>

<style lang="scss">
.movie-showcase-mobile-expansion-panel .v-expansion-panel-content__wrap {
  padding-left: 4px !important;
  padding-right: 4px !important;
}
</style>

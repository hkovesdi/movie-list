<template>
  <v-card
    v-if="$store.state.search.quickSearch.enabled"
    class="quick-search-card"
    light
    :style="'top: ' + (windowWidthAboveBreakpoint('xs') ? '64' : '56') + 'px;'"
    style="position: fixed; width: 100%; left: 50%; transform: translate(-50%); z-index: 6; max-width: 600px"
  >
    <v-card-title class="text-overline" v-text="searchText"></v-card-title>
    <v-card-text style="max-height: 500px; overflow-y: auto">
      <div
        v-if="($apollo.queries.searchResults.loading || debounceLoading) && $store.state.search.appBar.searchField.value.length > 0"
        class="d-flex align-center justify-center"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else-if="searchResults.length === 0">No results found</div>
      <MovieShowcaseMobile
        v-else-if="$store.state.search.appBar.searchField.value.length > 0"
        :movies="searchResults || []"
        :additional-function="disableSearch"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn small text link to="/search" @click="$store.commit('search/setQuickSearchEnabled', false)">Advanced search</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import widthBreakpoint from '../../mixins/widthbreakpoint.js'
import MovieShowcaseMobile from '../../movies/MovieShowcaseMobile'
import gql from 'graphql-tag'
export default {
  components: {
    MovieShowcaseMobile
  },
  mixins: [widthBreakpoint],
  data: () => ({
    timeoutForDebounce: null,
    debouncedValue: '',
    debounceLoading: false
  }),
  computed: {
    searchString() {
      return this.$store.state.search.appBar.searchField.value
    },
    searchText() {
      return this.searchString.length === 0 ? 'Start typing...' : `Search results for: ${this.searchString}`
    }
  },
  watch: {
    '$store.state.search.appBar.searchField.value': function (newVal) {
      this.debounceLoading = true
      clearTimeout(this.timeoutForDebounce)
      this.timeoutForDebounce = setTimeout(() => {
        this.debouncedValue = newVal
        this.debounceLoading = false
      }, 500)
    }
  },
  methods: {
    disableSearch() {
      this.$store.commit('search/setQuickSearchEnabled', false)
    }
  },
  apollo: {
    searchResults() {
      return {
        query: gql`
          query searchResults($searchTerm: String, $searchMode: MovieSearchMode!) {
            searchResults: movies(searchTerm: $searchTerm, searchMode: $searchMode) {
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
        variables() {
          return {
            searchTerm: this.debouncedValue,
            searchMode: 'TITLE'
          }
        },
        update: (data) => data.searchResults.data
      }
    }
  }
}
</script>

<style></style>

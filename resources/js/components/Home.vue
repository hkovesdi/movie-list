<template>
  <div>
    <div>
      <h1 class="font-weight-black">
        Most recent
      </h1>
      <MovieShowcase />
    </div>
    <div>
      <h1 class="font-weight-black">
        Highest Rated
      </h1>
      <MovieShowcase />
    </div>
    <div>
      <h1 class="font-weight-black">
        Important category
      </h1>
      <MovieShowcase />
    </div>
  </div>
</template>

<script>
import MovieShowcase from './movies/MovieShowcase'
import gql from 'graphql-tag'
export default {
  components: {
    MovieShowcase
  },
  data() {
    return {
      movieId: 2,
      labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
      time: 0,
      forecast: [
        {
          day: 'Tuesday',
          icon: 'mdi-white-balance-sunny',
          temp: '24\xB0/12\xB0'
        },
        {
          day: 'Wednesday',
          icon: 'mdi-white-balance-sunny',
          temp: '22\xB0/14\xB0'
        },
        { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' }
      ]
    }
  },
  methods: {
    login() {
      console.log(this.$apollo)
    }
  },
  apollo: {
    movie: {
      query: gql`
        query movie($movieId: ID!) {
          movie(id: $movieId) {
            id
            title
          }
        }
      `,
      variables() {
        return {
          movieId: this.movieId
        }
      }
    }
  }
}
</script>

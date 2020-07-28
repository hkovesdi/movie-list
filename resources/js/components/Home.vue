<template>
  <div>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2">
        Most recent
      </h1>
      <MovieShowcase :movies="returnIfExists(mostRecent)" />
    </div>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2">
        Top rated
      </h1>
      <MovieShowcase :movies="returnIfExists(topRated)" />
    </div>
    <div class="mb-8">
      <h1 class="font-weight-black mb-2">
        Very important
      </h1>
      <MovieShowcase :movies="returnIfExists(veryImportant)" />
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
  data: () => ({
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
  }),
  methods: {
    returnIfExists(request) {
      return request && request.data && request.data.length > 0 ? request.data : []
    }
  },
  apollo: {
    mostRecent: {
      query: gql`
        query mostRecent {
          mostRecent: movies(searchMode: ALL, page: 1) {
            data {
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
      update: (data) => data.mostRecent
    },
    topRated: {
      query: gql`
        query topRated {
          topRated: movies(searchMode: ALL, page: 2) {
            data {
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
      update: (data) => data.topRated
    },
    veryImportant: {
      query: gql`
        query veryImportant {
          veryImportant: movies(searchMode: ALL, page: 3) {
            data {
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
      update: (data) => data.veryImportant
    }
  }
}
</script>

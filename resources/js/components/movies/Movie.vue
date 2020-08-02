<template>
  <div v-if="movie">
    <v-img width="292" height="429" :src="movie.high_res_poster_url">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    movieProp: {
      default: null,
      type: Object
    }
  },
  data: function () {
    return {
      movie: this.movieProp
    }
  },
  apollo: {
    movie: {
      query: gql`
        query movie($id: ID!) {
          movie(id: $id) {
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
      `,
      variables() {
        return { id: this.$route.params.id }
      },
      skip() {
        return this.movieProp !== null
      },
      result({ data }) {
        if (data.movie === null) this.$router.replace({ name: 'NotFound', params: { '0': this.$route.path } })
      }
    }
  }
}
</script>

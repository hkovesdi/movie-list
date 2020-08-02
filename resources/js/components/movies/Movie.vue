<template>
  <div v-if="movie !== null" class="mt-10 ml-6 d-flex">
    <div>
      <v-img width="296" height="435" :src="movie.high_res_poster_url">
        <template v-slot:placeholder>
          <v-skeleton-loader class="poster-skeleton" :loading="true" width="296" height="435" type="image" />
        </template>
      </v-img>
    </div>
    <div class="ml-4" style="max-width: 55ch;">
      <h1>{{ movie.title }}</h1>
      <p class="text-body-2 text--secondary">{{ movie.tagline }}</p>
      <p class="text--primary">{{ movie.description }}</p>
    </div>
  </div>
  <div v-else class="mt-10 ml-6 d-flex">
    <div class="poster-skeleton">
      <v-skeleton-loader :loading="true" width="296" height="435" type="image" />
    </div>
    <div class="ml-4 mt-1" style="max-width: 55ch;">
      <v-skeleton-loader :loading="true" type="heading" width="55ch" class="mb-4" />
      <v-skeleton-loader :loading="true" type="text" class="mb-6" />
      <v-skeleton-loader :loading="true" type="paragraph" />
      <v-skeleton-loader :loading="true" type="paragraph" />
      <v-skeleton-loader :loading="true" type="paragraph" />
    </div>
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
<style lang="scss">
.poster-skeleton .v-skeleton-loader__image {
  height: 100% !important;
  width: 100% !important;
}
</style>

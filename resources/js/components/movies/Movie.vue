<template>
  <div v-if="movie !== null" class="mt-10 ml-6 d-flex">
    <div>
      <v-img width="296" height="435" :src="movie.high_res_poster_url">
        <template v-slot:placeholder>
          <v-skeleton-loader class="poster-skeleton" tile loading width="296" height="435" type="image" />
        </template>
      </v-img>
      <v-btn tile class="primary mt-2" style="width: 100%;">Add to my list</v-btn>
    </div>
    <div class="ml-4" style="max-width: 55ch; flex-grow: 2;">
      <h1>{{ movie.title }}</h1>
      <div class="mb-2" style="font-size: 22px;">
        <span class="mr-6">
          <svg
            width="17"
            height="17"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgb(245 197 24)"
            role="presentation"
            style="width: 19px; !important height: 19px !important; vertical-align: baseline;"
          >
            <path
              d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
            ></path>
          </svg>
          <span style="vertical-align: bottom !important;">{{ movie.users_rating }}</span>
        </span>
        <span class="mr-6">
          <v-icon size="21" style="vertical-align: baseline;">mdi-clock-time-eight-outline</v-icon>
          <span>{{ movie.runtime }} min</span>
        </span>
        <span>
          <v-icon size="21" style="vertical-align: baseline;">mdi-calendar</v-icon>
          <span> {{ movie.year }}</span>
        </span>
      </div>
      <p class="text-body-2 text--secondary">{{ movie.tagline }}</p>
      <p class="text--primary">{{ movie.description }}</p>
      <div>
        <v-chip v-for="genre in movie.genres" :key="genre.name" class="mr-1" :class="calculateChipColor(Math.random() * 10 + 1)" small>
          {{ genre.name }}
        </v-chip>
      </div>
    </div>
    <div class="ml-6 mr-3" style="max-width: 40%;">
      <div class="mb-4">
        <h3 style="margin-top: 4px;">{{ movie.directors.length > 1 ? 'Directors' : 'Director' }}</h3>
        <v-container class="pa-0">
          <v-row>
            <v-col v-for="director in movie.directors" :key="director.id" class="mt-2 d-flex align-center" xs="12" sm="12" md="6" lg="4" xl="3">
              <div>
                <v-img width="33" height="44" :src="asd">
                  <template v-slot:placeholder>
                    <v-skeleton-loader class="poster-skeleton" tile loading width="33" height="44" type="image" />
                  </template>
                </v-img>
              </div>
              <span class="ml-2">{{ director.name }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div>
        <h3>Actors</h3>
        <v-container class="pa-0">
          <v-row>
            <v-col v-for="actor in movie.actors" :key="actor.id" class="mt-2 d-flex align-center pb-0 pr-0" xs="12" sm="12" md="6" lg="4" xl="3">
              <div>
                <v-img width="33" height="44" :src="asd">
                  <template v-slot:placeholder>
                    <v-skeleton-loader class="poster-skeleton" tile loading width="33" height="44" type="image" />
                  </template>
                </v-img>
              </div>
              <span class="ml-2">{{ actor.name }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
  <div v-else class="mt-10 ml-6 d-flex">
    <div class="poster-skeleton">
      <v-skeleton-loader tile loading width="296" height="435" type="image" />
    </div>
    <div class="ml-4 mt-1" style="max-width: 55ch;">
      <v-skeleton-loader loading type="heading" width="55ch" class="mb-4" />
      <v-skeleton-loader loading type="text" class="mb-6" />
      <v-skeleton-loader loading type="paragraph" />
      <v-skeleton-loader loading type="paragraph" />
      <v-skeleton-loader loading type="paragraph" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import calculateChipColor from '../../helpers/calculateRatingColor'
export default {
  data: function () {
    return {
      movie: null
    }
  },
  watch: {
    '$route.params.id': function () {
      this.movie = null
    }
  },
  methods: {
    calculateChipColor
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
            actors {
              id
              name
            }
            directors {
              id
              name
            }
            genres {
              id
              name
            }
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id }
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

<template>
  <div v-dragscroll.x class="outer">
    <div class="inner">
      <a href="#1">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#2">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#3">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BNzU3ZTI1OTktNjVkNy00OWEzLWIyNzAtMWQ5YjRkZDU1ZjAxXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#4">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#5">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BNDQ2YWVmZjEtMTE1ZS00MDk1LTg5ODUtMDVlODk0OTM2ODMwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#6">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BNWExNzg3MmMtYjc3MS00MzFlLWJiOWQtNWYxZTgxNjhlZTQ2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#7">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BMWEzNmUxZTMtZjY0My00OGNmLWIyNDctODM2YzZjM2YwZWEwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#8">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BZmE0MGJhNmYtOWNjYi00Njc5LWE2YjEtMWMxZTVmODUwMmMxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#9">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BMTI5NmViY2YtNDk5NC00NjY2LWFlNGYtOGEwNzY1MTZmMjFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
    <div class="inner">
      <a href="#10">
        <v-img
          height="300"
          contain
          src="https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        />
      </a>
    </div>
  </div>
</template>
<script>
import { dragscroll } from 'vue-dragscroll'
export default {
  directives: {
    dragscroll
  }
}
</script>

<style lang="scss">
.outer {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 326px;
  padding: 4px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  .inner {
    max-width: 200px;
    flex: 0 0 auto;
    margin-right: 12px;
  }
}
</style>

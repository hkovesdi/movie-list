<template>
  <v-app-bar color="primary" dark clipped-left flat app>
    <v-container fluid class="pa-0">
      <v-row no-gutters align="center">
        <v-col :cols="leftCol" class="d-flex align-center">
          <v-app-bar-nav-icon v-if="!fullWidthSearch && !widthAboveBreakpoint('xs')" class="mr-2" @click.stop="openDrawer()"></v-app-bar-nav-icon>
          <v-toolbar-title v-if="!fullWidthSearch" class="d-inline">
            <span>Project Tracc</span>
          </v-toolbar-title>
        </v-col>
        <v-col :cols="searchCol" class="d-flex justify-center">
          <template v-if="fullWidthSearch">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-3" icon v-bind="attrs" v-on="on" @click="fullWidthSearch = !fullWidthSearch">
                  <v-icon>fas fa-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Back</span>
            </v-tooltip>
          </template>
          <v-text-field
            v-if="breakpoints.xs <= (windowWidth || 0) || fullWidthSearch"
            class="app-bar-text-field"
            flat
            solo-inverted
            hide-details
            label="Search"
          />
        </v-col>
        <v-col :cols="rightCol" class="d-flex justify-end">
          <template v-if="!fullWidthSearch">
            <v-tooltip class="hidden-sm-and-up" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="hidden-sm-and-up" icon v-bind="attrs" v-on="on" @click="fullWidthSearch = !fullWidthSearch">
                  <v-icon size="22">fas fa-search</v-icon>
                </v-btn>
              </template>
              <span>Search</span>
            </v-tooltip>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    fullWidthSearch: false,
    mounted: false
  }),
  computed: {
    windowWidth() {
      return this.$store.getters['window/getWidth']
    },
    breakpoints() {
      return this.$vuetify.breakpoint.thresholds
    },
    widthAboveBreakpoint() {
      return (point) => this.windowWidth >= this.breakpoints[point]
    },
    leftCol() {
      return this.calculateCols('3', '10', '0')
    },
    rightCol() {
      return this.calculateCols('3', '2', '0')
    },
    searchCol() {
      return this.calculateCols('6', '0', '12')
    }
  },
  methods: {
    calculateCols(aboveXs, belowXs, withFullSearch) {
      if (this.widthAboveBreakpoint('xs')) {
        return aboveXs
      } else {
        return this.fullWidthSearch ? withFullSearch : belowXs
      }
    },
    openDrawer() {
      this.$store.commit('navigation/setDrawer', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-text-field {
  flex: 0 1 600px;
}
</style>

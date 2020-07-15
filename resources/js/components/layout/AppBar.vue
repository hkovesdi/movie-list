<template>
  <v-app-bar color="primary" dark clipped-left flat app>
    <v-container fluid class="pa-0">
      <v-row no-gutters align="center">
        <v-col v-if="!fullWidthSearch" :cols="leftCol" class="d-flex align-center">
          <v-app-bar-nav-icon v-if="!windowWidthAboveBreakpoint('xs')" class="mr-3" @click.stop="openDrawer()"></v-app-bar-nav-icon>
          <v-toolbar-title class="d-inline">
            <span>Project Tracc</span>
          </v-toolbar-title>
        </v-col>
        <v-col :cols="middleCol" class="d-flex justify-center">
          <template v-if="fullWidthSearch">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-3" icon v-bind="attrs" v-on="on" @click="fullWidthSearch = !fullWidthSearch">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Back</span>
            </v-tooltip>
          </template>
          <v-text-field
            v-if="windowWidthAboveBreakpoint('xs') || fullWidthSearch"
            class="app-bar-text-field"
            flat
            solo-inverted
            hide-details
            label="Search"
          />
        </v-col>
        <v-col v-if="!fullWidthSearch && !windowWidthAboveBreakpoint('xs')" :cols="rightCol" class="d-flex justify-end">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="fullWidthSearch = !fullWidthSearch">
                <v-icon size="22">mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Search</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import widthBreakpoint from '../mixins/widthbreakpoint.js'
export default {
  mixins: [widthBreakpoint],
  data: () => ({
    fullWidthSearch: false
  }),
  computed: {
    leftCol() {
      return this.calculateCols('3', '10', '0')
    },
    rightCol() {
      return this.calculateCols('3', '2', '0')
    },
    middleCol() {
      return this.calculateCols('6', '0', '12')
    }
  },
  methods: {
    calculateCols(aboveXs, belowXs, withFullSearch) {
      if (this.windowWidthAboveBreakpoint('xs')) {
        return aboveXs
      } else {
        return this.fullWidthSearch ? withFullSearch : belowXs
      }
    },
    openDrawer() {
      this.$store.commit('navigation/setDrawerEnabled', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-text-field {
  flex: 0 1 600px;
}
</style>

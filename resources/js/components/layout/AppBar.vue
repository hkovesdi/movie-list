<template>
  <v-app-bar color="primary" dark clipped-left flat app>
    <v-container fluid class="pa-0">
      <v-row no-gutters align="center">
        <v-col :cols="outerCol">
          <v-toolbar-title v-if="!fullWidthSearch">
            <span>Project Tracc</span>
          </v-toolbar-title>
        </v-col>
        <v-col :cols="searchCol" class="d-flex justify-center">
          <v-btn v-if="fullWidthSearch" class="mr-3" icon @click="fullWidthSearch = !fullWidthSearch">
            <v-icon>fas fa-arrow-left</v-icon>
          </v-btn>
          <v-text-field
            v-if="breakpoints.xs <= (windowWidth || 0) || fullWidthSearch"
            class="app-bar-text-field"
            flat
            solo-inverted
            hide-details
            label="Search"
          />
        </v-col>
        <v-col :cols="outerCol" class="d-flex justify-end">
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
    mounted: false,
    windowWidth: 0
  }),
  computed: {
    breakpoints() {
      return this.$vuetify.breakpoint.thresholds
    },
    outerCol() {
      return this.fullWidthSearch ? '0' : '3'
    },
    searchCol() {
      return this.fullWidthSearch ? '12' : '6'
    }
  },
  mounted() {
    let handler = () => {
      this.windowWidth = window.innerWidth
    }
    window.onresize = handler
    window.onload = handler
  }
}
</script>

<style lang="scss" scoped>
.app-bar-text-field {
  flex: 0 1 600px;
}
.v-toolbar__title {
  width: 275px;
}
</style>

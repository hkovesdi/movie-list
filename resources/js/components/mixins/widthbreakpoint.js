export default {
  computed: {
    windowWidth() {
      return this.$store.getters['window/getWidth']
    },
    breakpoints() {
      return this.$vuetify.breakpoint.thresholds
    },
    windowWidthAboveBreakpoint() {
      // If this value is low, then some elements that should be hidden flash for a moment on first pageload.
      const defaultWidth = 9999999

      return (point) => (this.windowWidth || defaultWidth) >= this.breakpoints[point]
    }
  }
}

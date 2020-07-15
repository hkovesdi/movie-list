export default {
  computed: {
    breakpoints() {
      return this.$vuetify.breakpoint.thresholds
    },
    windowWidthAboveBreakpoint() {
      // If this value is low, then some elements that should be hidden flash for a moment on first pageload.
      const defaultWidth = 9999999

      return (point) => (this.$store.state.window.width || defaultWidth) >= this.breakpoints[point]
    }
  }
}

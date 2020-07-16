export default {
  computed: {
    breakpoints() {
      return this.$vuetify.breakpoint.thresholds
    }
  },
  methods: {
    windowWidthAboveBreakpoint(point) {
      // If this value is low, then some elements that should be hidden flash for a moment on first pageload.
      const defaultWidth = 9999999

      return (this.$store.state.window.width || defaultWidth) >= this.breakpoints[point]
    }
  }
}

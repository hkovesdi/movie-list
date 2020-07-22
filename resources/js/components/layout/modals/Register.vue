<template>
  <v-dialog
    v-model="state"
    :fullscreen="!windowWidthAboveBreakpoint('xs')"
    persistent
    max-width="600"
    :transition="windowWidthAboveBreakpoint('xs') ? 'scale-transition' : 'dialog-bottom-transition'"
  >
    <v-card tile>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="ml-3">Register</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="state = false">
          <v-icon size="28">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert v-for="errorMessage in $store.state.modals.register.errors" :key="errorMessage" type="error" tile class="ma-0">
        {{ errorMessage }}
      </v-alert>
      <v-stepper v-show="windowWidthAboveBreakpoint('sm')" v-model="currentStep">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="currentStep > 1" step="1"
            >{{ steps.text1.title }}<small>{{ steps.text1.small }}</small></v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="currentStep > 2" step="2"
            >{{ steps.text2.title }}<small>{{ steps.text2.small }}</small></v-stepper-step
          >
        </v-stepper-header>
        <v-stepper-items>
          <RegisterStep1Basic class="pt-3" />
          <RegisterStep2Personal class="pt-3" />
        </v-stepper-items>
      </v-stepper>
      <v-stepper
        v-show="!windowWidthAboveBreakpoint('sm')"
        v-model="currentStep"
        :class="!windowWidthAboveBreakpoint('xs') ? 'elevation-0' : ''"
        vertical
      >
        <v-stepper-step :complete="currentStep > 1" step="1"
          >{{ steps.text1.title }}<small>{{ steps.text1.small }}</small></v-stepper-step
        >
        <RegisterStep1Basic />

        <v-stepper-step :complete="currentStep > 2" step="2"
          >{{ steps.text2.title }}<small>{{ steps.text2.small }}</small></v-stepper-step
        >
        <RegisterStep2Personal />
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import widthBreakpoint from '../../mixins/widthbreakpoint.js'
import RegisterStep1Basic from './RegisterStep1Basic'
import RegisterStep2Personal from './RegisterStep2Personal'
export default {
  components: {
    RegisterStep1Basic,
    RegisterStep2Personal
  },
  mixins: [widthBreakpoint],
  data: () => ({
    steps: {
      text1: { title: 'Basic information', small: 'Required' },
      text2: { title: 'Personalization', small: 'Optional' }
    }
  }),
  computed: {
    state: {
      get() {
        return this.$store.state.modals.register.enabled
      },
      set(val) {
        this.$store.commit('modals/setRegisterEnabled', val)
      }
    },
    currentStep() {
      return this.$store.state.modals.register.currentStep
    }
  }
}
</script>

<style lang="scss">
.v-dialog {
  margin: 0 !important;
}
</style>

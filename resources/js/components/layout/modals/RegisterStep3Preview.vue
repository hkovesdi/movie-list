<template>
  <v-stepper-content step="3">
    <v-card-text>
      <v-card>
        <v-card-text>
          <v-avatar>
            <v-img :src="$store.getters['modals/avatarURL'] || defaultAvatar" />
          </v-avatar>
          <h4 v-text="$store.state.modals.register.step1.username"></h4>
          <p v-text="$store.state.modals.register.step2.bio"></p>
        </v-card-text>
      </v-card>
    </v-card-text>

    <div class="float-right">
      <v-btn text @click="currentStep = 2">Back</v-btn>
      <v-btn color="primary" @click="register">Register</v-btn>
    </div>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png'
  }),
  computed: {
    currentStep: {
      get() {
        return this.$store.state.modals.register.currentStep
      },
      set(val) {
        this.$store.commit('modals/setRegisterCurrentStep', val)
      }
    }
  },
  methods: {
    async register() {
      if (this.loading) return
      this.disabled = true
      this.loading = true
      await this.$store.dispatch('user/register', {
        ...this.$store.state.modals.register.step1,
        bio: this.$store.state.modals.register.step2.bio,
        avatar: this.$store.getters['modals/avatarURL']
      })
      this.loading = false
      this.$store.state.modals.register.enabled = false
      this.resetState()
    },
    resetState() {
      this.$store.dispatch('modals/resetRegisterState')
      this.currentStep = 1
    }
  }
}
</script>

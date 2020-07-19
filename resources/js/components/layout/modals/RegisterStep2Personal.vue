<template>
  <v-stepper-content step="2">
    <v-card-text>
      <v-form>
        <h4 class="mb-3 font-weight-light">These fields are optional, you can fill them out later.</h4>
        <v-text-field v-model="bio" label="Bio" :rules="bioRule" :counter="bioMaximumChars" outlined></v-text-field>

        <v-file-input
          v-model="avatar"
          :rules="fileRules"
          accept="image/png, image/jpeg"
          prepend-icon=""
          hint="Maximum size: 10MB"
          persistent-hint
          label="Avatar"
          outlined
          single-line
        >
          <template v-slot:append>
            <v-avatar size="24"><v-img :src="$store.getters['modals/avatarURL'] || defaultAvatar" /></v-avatar>
          </template>
        </v-file-input>
      </v-form>
    </v-card-text>

    <div class="float-right">
      <v-btn text @click="currentStep = 1">Back</v-btn>
      <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
    </div>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png',
    bioMaximumChars: 50,
    fileRules: [(value) => !value || value.size < 10000000 || 'Avatar size should be less than 10 MB!']
  }),
  computed: {
    bioRule() {
      return [(v) => (v || '').length <= this.bioMaximumChars || `A maximum of ${this.bioMaximumChars} characters are allowed`]
    },
    currentStep: {
      get() {
        return this.$store.state.modals.register.currentStep
      },
      set(val) {
        this.$store.commit('modals/setRegisterCurrentStep', val)
      }
    },
    bio: {
      get() {
        return this.$store.state.modals.register.step2.bio
      },
      set(val) {
        this.$store.commit('modals/setRegisterBio', val)
      }
    },
    avatar: {
      get() {
        return this.$store.state.modals.register.step2.avatar
      },
      set(val) {
        this.$store.commit('modals/setRegisterAvatar', val)
      }
    }
  }
}
</script>
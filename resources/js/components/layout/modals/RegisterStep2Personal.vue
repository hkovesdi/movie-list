<template>
  <v-stepper-content step="2">
    <v-form v-model="valid" @submit.prevent>
      <v-card-text>
        <h4 class="mb-3 font-weight-light">These fields are optional, you can fill them out later.</h4>
        <v-text-field v-model="bio" label="Bio" :rules="bioRule" :counter="bioMaximumChars" outlined autofocus></v-text-field>

        <v-file-input
          v-model="avatar"
          :rules="fileRules"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon=""
          hint="Maximum size: 2MB"
          persistent-hint
          label="Avatar"
          outlined
          single-line
        >
          <template v-slot:append>
            <v-avatar size="24"><v-img :src="$store.getters['modals/avatarURL'] || defaultAvatar" /></v-avatar>
          </template>
        </v-file-input>
      </v-card-text>

      <div class="float-right">
        <v-btn text @click="currentStep = 1">Back</v-btn>
        <v-btn type="submit" :disabled="!valid || loading" :loading="loading" color="primary" @click.prevent="register">Create account</v-btn>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    defaultAvatar: 'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png',
    bioMaximumChars: 50,
    fileRules: [(value) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']
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
        return this.$store.state.modals.register.step2.avatarFile
      },
      set(val) {
        this.$store.commit('modals/setRegisterAvatar', val)
      }
    }
  },
  methods: {
    async register() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('user/register', {
          ...this.$store.state.modals.register.step1,
          bio: this.bio || null,
          avatar: this.avatar
        })
      } catch (err) {
        if (err instanceof Error) {
          this.setErrors([err.message])
        } else {
          this.setErrors(err)
        }
        this.loading = false
        return
      }
      this.setErrors([])
      this.loading = false
      this.$store.state.modals.register.enabled = false
      this.resetState()
      this.$store.commit('snackbar/add', {
        message: 'Successfully registered!',
        color: 'green'
      })
    },
    resetState() {
      this.$store.dispatch('modals/resetRegisterState')
      this.currentStep = 1
    },
    setErrors(errors) {
      this.$store.commit('modals/setRegisterErrors', errors)
    }
  }
}
</script>

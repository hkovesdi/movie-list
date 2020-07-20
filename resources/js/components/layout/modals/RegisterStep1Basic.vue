<template>
  <v-stepper-content step="1">
    <v-form v-model="valid">
      <v-card-text>
        <v-text-field
          v-model="username"
          :rules="[rules.minimumChars(3), rules.maximumChars(10), rules.noSpaces, rules.onlyURLSafe]"
          type="text"
          label="Username"
          outlined
          autofocus
        ></v-text-field>
        <v-text-field v-model="email" :rules="[rules.validEmail]" type="email" label="Email" outlined></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.minimumChars(10), rules.maximumChars(30), rules.noSpaces]"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          outlined
        >
          <template v-slot:append>
            <v-icon tabindex="-1" @click="showPassword = !showPassword" v-text="showPassword ? 'mdi-eye' : 'mdi-eye-off'"></v-icon>
          </template>
        </v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="[rules.passwordMatch(password)]"
          :type="showPasswordConfirm ? 'text' : 'password'"
          label="Confirm password"
          outlined
        >
          <template v-slot:append>
            <v-icon
              tabindex="-1"
              @click="showPasswordConfirm = !showPasswordConfirm"
              v-text="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-icon>
          </template>
        </v-text-field>
      </v-card-text>
      <div class="float-right">
        <v-btn text @click="state = false">Cancel</v-btn>
        <v-btn type="submit" :disabled="!valid" color="primary" @click.prevent="currentStep = 2">Continue</v-btn>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    showPassword: false,
    showPasswordConfirm: false,
    rules: {
      validEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '') || 'You must enter a valid e-mail address'
      },
      minimumChars(num) {
        return (v) => (v || '').length >= num || `A minimum of ${num} characters are required`
      },
      maximumChars(num) {
        return (v) => (v || '').length <= num || `A maximum of ${num} characters are allowed`
      },
      noSpaces(v) {
        return (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      },
      passwordMatch(to) {
        return (v) => (!!v && v) === (to || '') || 'Passwords do not match'
      },
      onlyURLSafe(v) {
        return /^[a-zA-Z0-9_-]*$/.test(v || '') || 'You cannot use special characters'
      }
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
    currentStep: {
      get() {
        return this.$store.state.modals.register.currentStep
      },
      set(val) {
        this.$store.commit('modals/setRegisterCurrentStep', val)
      }
    },
    email: {
      get() {
        return this.$store.state.modals.register.step1.email
      },
      set(val) {
        this.$store.commit('modals/setRegisterEmail', val)
      }
    },
    username: {
      get() {
        return this.$store.state.modals.register.step1.username
      },
      set(val) {
        this.$store.commit('modals/setRegisterUsername', val)
      }
    },
    password: {
      get() {
        return this.$store.state.modals.register.step1.password
      },
      set(val) {
        this.$store.commit('modals/setRegisterPassword', val)
      }
    },
    passwordConfirm: {
      get() {
        return this.$store.state.modals.register.step1.passwordConfirm
      },
      set(val) {
        this.$store.commit('modals/setRegisterPasswordConfirm', val)
      }
    }
  }
}
</script>

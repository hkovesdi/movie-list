<template>
  <v-stepper-content step="1">
    <v-form v-model="valid">
      <v-card-text>
        <v-text-field
          v-model="username"
          :error-messages="$store.state.modals.register.step1.username.errors"
          :loading="$store.state.modals.register.step1.username.loading"
          type="text"
          label="Username"
          outlined
          autofocus
          @input="validateField('username', [rules.minimumChars(3), rules.maximumChars(10), rules.noSpaces, rules.onlyURLSafe])"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="$store.state.modals.register.step1.email.errors"
          :loading="$store.state.modals.register.step1.email.loading"
          type="email"
          label="Email"
          outlined
          @input="validateField('email', [rules.validEmail])"
        ></v-text-field>
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
        <v-btn type="submit" :disabled="!valid || currentlyValidating" color="primary" @click.prevent="currentStep = 2">Continue</v-btn>
      </div>
    </v-form>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    currentlyValidating: false,
    usernameLoading: false,
    showPassword: false,
    showPasswordConfirm: false,
    rules: {
      validEmail(v) {
        return (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v || ''
          ) || 'You must enter a valid e-mail address'
        )
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
    username: {
      get() {
        return this.$store.state.modals.register.step1.username.value
      },
      set(val) {
        this.$store.commit('modals/setRegisterUsername', { field: 'value', val })
      }
    },
    email: {
      get() {
        return this.$store.state.modals.register.step1.email.value
      },
      set(val) {
        this.$store.commit('modals/setRegisterEmail', { field: 'value', val })
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
  },
  methods: {
    validateField(field, rules) {
      const setInRegisterField = this.setInRegister(field.charAt(0).toUpperCase() + field.slice(1))

      // Reset previous state
      clearTimeout(this.$store.state.modals.register.step1[field].currentCallback)
      setInRegisterField({ field: 'errors', val: [] })
      setInRegisterField({ field: 'loading', val: false })
      this.currentlyValidating = true

      // Check rules
      setInRegisterField({
        field: 'errors',
        val: rules.map((rule) => rule(this[field])).filter((result) => typeof result === 'string')
      })

      if (this.$store.state.modals.register.step1[field].errors.length > 0) {
        this.currentlyValidating = false
      } else {
        // Check if field already exists in DB
        setInRegisterField({ field: 'loading', val: true })

        setInRegisterField({
          field: 'currentCallback',
          val: setTimeout(async () => {
            let alreadyExists = await this.$store.dispatch('user/exists', { searchString: this[field], searchField: field.toUpperCase() })
            if (typeof alreadyExists === 'string') setInRegisterField({ field: 'errors', val: alreadyExists })

            this.currentlyValidating = false
            setInRegisterField({ field: 'loading', val: false })
          }, 500)
        })
      }
    },
    setInRegister(outerField) {
      return (innerFieldAndValueObj) => this.$store.commit(`modals/setRegister${outerField}`, innerFieldAndValueObj)
    }
  }
}
</script>

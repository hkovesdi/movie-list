<template>
  <v-dialog v-model="modal" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item link color="primary" v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>{{ listItem.icon.code }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ listItem.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card id="register-modal">
      <v-stepper v-show="windowWidthAboveBreakpoint('sm')" v-model="stepper" alt-labels>
        <v-stepper-header>
          <v-stepper-step :complete="stepper > 1" step="1">{{ steps.text1 }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="stepper > 2" step="2">{{ steps.text2 }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">{{ steps.text3 }}</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text>
              <v-form>
                <v-text-field label="Email" placeholder="you@example.com" outlined></v-text-field>
                <v-text-field label="Username" placeholder="JohnDoe" outlined></v-text-field>
                <v-text-field type="password" label="Password" placeholder="hunter2" outlined></v-text-field>
                <v-text-field type="password" label="Confirm password" placeholder="hunter2" outlined></v-text-field>
              </v-form>
            </v-card-text>
            <div style="float: right;">
              <v-btn text @click="modal = false">Cancel</v-btn>
              <v-btn color="primary" @click="stepper = 2">Continue</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card-text>
              <v-form>
                <v-text-field label="Describe yourself" placeholder="Coffee -> Code" outlined></v-text-field>
                <v-file-input
                  v-model="fileu"
                  :rules="fileRules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an image file on your computer"
                  prepend-icon=""
                  hint="Maximum size: 10MB"
                  persistent-hint
                  append-icon="mdi-account-circle-outline"
                  label="Avatar"
                  outlined
                ></v-file-input>
              </v-form>
            </v-card-text>

            <div style="float: right;">
              <v-btn text @click="stepper = 1">Back</v-btn>
              <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card-text>
              <v-avatar>
                <v-img :src="fileURL" />
              </v-avatar>
            </v-card-text>

            <div style="float: right;">
              <v-btn text @click="stepper = 2">Back</v-btn>
              <v-btn color="primary" @click="stepper = 1">Register</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-stepper v-show="!windowWidthAboveBreakpoint('sm')" v-model="stepperVert" vertical>
        <v-stepper-step :complete="stepperVert > 1" step="1">
          {{ steps.text1 }}
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card-text>
            <v-form>
              <v-text-field label="Email" placeholder="you@example.com" outlined></v-text-field>
              <v-text-field label="Username" placeholder="Thomas6969" outlined></v-text-field>
              <v-text-field type="password" label="Password" placeholder="hunter2" outlined></v-text-field>
            </v-form>
          </v-card-text>
          <div style="float: right;">
            <v-btn text @click="modal = false">Cancel</v-btn>
            <v-btn color="primary" @click="stepperVert = 2">Continue</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="stepperVert > 2" step="2">{{ steps.text2 }}</v-stepper-step>
        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <div style="float: right;">
            <v-btn text @click="modal = false">Cancel</v-btn>
            <v-btn color="primary" @click="stepperVert = 3">Continue</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="stepperVert > 3" step="3">{{ steps.text3 }}</v-stepper-step>
        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <div style="float: right;">
            <v-btn text @click="modal = false">Cancel</v-btn>
            <v-btn color="primary" @click="stepperVert = 1">Register</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import widthBreakpoint from '../../mixins/widthbreakpoint.js'
export default {
  mixins: [widthBreakpoint],
  data: () => ({
    fileu: undefined,
    fileRules: [(value) => !value || value.size < 10000000 || 'Avatar size should be less than 10 MB!'],
    modal: false,
    stepper: 1,
    stepperVert: 1,
    steps: {
      text1: 'Basic information',
      text2: 'Personalization',
      text3: 'Preview'
    },
    listItem: {
      text: 'Register',
      to: '/register',
      icon: {
        code: 'mdi-account-plus'
      }
    }
  }),
  computed: {
    fileURL() {
      return window && this.fileu ? window.URL.createObjectURL(this.fileu) : ''
    }
  }
}
</script>

<style lang="scss"></style>

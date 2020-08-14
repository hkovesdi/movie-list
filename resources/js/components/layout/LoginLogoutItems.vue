<template>
  <div v-if="windowWidthAboveBreakpoint('xs') && !this.$store.state.navigation.drawer.expanded">
    <v-tooltip v-for="item in items" :key="item.text" color="grey darken-2" right>
      <template v-slot:activator="{ on, attrs }">
        <v-list-item link color="primary" v-bind="attrs" v-on="on" @click.stop="item.click">
          <v-list-item-icon>
            <v-icon>{{ item.icon.code }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <span>{{ item.text }}</span>
    </v-tooltip>
  </div>
  <div v-else>
    <v-list-item v-for="item in items" :key="item.text" link color="primary" @click.stop="item.click">
      <v-list-item-icon>
        <v-icon>{{ item.icon.code }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import widthBreakpoint from '../mixins/widthbreakpoint.js'
export default {
  mixins: [widthBreakpoint],
  computed: {
    items() {
      return [
        {
          text: 'Register',
          click: this.enableRegisterModal,
          icon: { code: 'mdi-account-plus' }
        },
        {
          text: 'Login',
          click: this.enableLoginModal,
          icon: { code: 'mdi-login' }
        }
      ]
    }
  },
  methods: {
    enableRegisterModal() {
      this.$store.commit('modals/setRegisterEnabled', true)
    },
    enableLoginModal() {
      this.$store.commit('modals/setLoginEnabled', true)
    }
  }
}
</script>

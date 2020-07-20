<template>
  <div>
    <v-list-item link color="primary" @click.stop="$store.commit('modals/setRegisterEnabled', true)">
      <v-list-item-icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          Register
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link color="primary" @click.stop="$store.commit('modals/setLoginEnabled', true)">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          Login
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {}
</script>

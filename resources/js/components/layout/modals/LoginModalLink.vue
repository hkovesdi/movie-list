<template>
  <v-dialog v-model="state" max-width="290">
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
    <v-card>
      <v-card-title class="headline">{{ listItem.text }}</v-card-title>
      <v-card-text>Let Google help apps determine location.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="state = false">Disagree</v-btn>
        <v-btn color="primary darken-1" text @click="state = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    state: false,
    listItem: { text: 'Log in', to: '/login', icon: { code: 'mdi-login' } }
  })
}
</script>

<style lang="scss" scoped></style>

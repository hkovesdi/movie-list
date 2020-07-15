<template>
  <div>
    <v-list-item
      v-for="item in items"
      :key="item.text"
      :to="item.to"
      link
      exact
      @click="item.dispatch !== undefined ? $store.dispatch(item.dispatch) : ''"
    >
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
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

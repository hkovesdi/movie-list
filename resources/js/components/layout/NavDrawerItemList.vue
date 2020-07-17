<template>
  <div>
    <v-list-item v-for="item in items" :key="item.text" :to="item.to" :class="matchWithOrWithoutQuery(item.to)" link exact color="primary">
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
  },
  methods: {
    matchWithOrWithoutQuery(path) {
      return this.$route.path === path ? 'v-list-item--active' : ''
    }
  }
}
</script>

<template>
  <v-list-item :dark="dark" :to="item.to" :class="matchWithOrWithoutQuery(item.to)" link exact :color="color">
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

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  methods: {
    matchWithOrWithoutQuery(path) {
      return this.$route.path === path ? 'v-list-item--active' : ''
    }
  }
}
</script>

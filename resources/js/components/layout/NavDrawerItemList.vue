<template>
  <div v-if="withTooltips">
    <v-tooltip v-for="item in items" :key="item.text" :color="tooltipColor" right>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <NavDrawerItemListElement :item="item" :dark="dark" :to="item.to" :color="color" link exact />
        </div>
      </template>
      <span>{{ item.text }}</span>
    </v-tooltip>
  </div>
  <div v-else>
    <NavDrawerItemListElement v-for="item in items" :key="item.text" :item="item" :dark="dark" :to="item.to" link exact :color="color" />
  </div>
</template>

<script>
import NavDrawerItemListElement from './NavDrawerItemListElement.vue'
export default {
  components: {
    NavDrawerItemListElement
  },
  props: {
    items: {
      type: Array,
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
    },
    withTooltips: {
      type: Boolean,
      required: false,
      default: false
    },
    tooltipColor: {
      type: String,
      required: false,
      default: 'grey darken-2'
    }
  }
}
</script>

<template>
  <li>
    #{{ number }} - {{ name }}
  </li>
</template>

<script setup>
import { defineProps} from 'vue';


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }
})

const msg = "My Pokedex Card"

</script>

<style lang="scss" scoped>

</style>
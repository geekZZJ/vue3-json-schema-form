<template>
  {{ name }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const nameRef = ref('zzj')
    return {
      name: nameRef,
    }
  },
})
</script>

<style></style>

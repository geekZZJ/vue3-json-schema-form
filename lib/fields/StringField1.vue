<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FieldPropsDefine } from '../types'
const props = defineProps(FieldPropsDefine)

const handleChange = (e: any) => {
  props.onChange(e.target.value)
}
</script>

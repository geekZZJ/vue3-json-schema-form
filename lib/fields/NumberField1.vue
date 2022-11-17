<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { FieldPropsDefine } from '../types'
const props = defineProps(FieldPropsDefine)

const handleChange = (e: any) => {
  const value = e.target.value
  const num = Number(value)
  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(num)
  }
}
</script>

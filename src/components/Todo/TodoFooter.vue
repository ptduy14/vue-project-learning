<script lang="ts" setup>
import type { INumOfTodo } from '@/interfaces/INumOfTodo'
import { defineProps } from 'vue'

const { numOfTodo } = defineProps<{
  numOfTodo: INumOfTodo
}>()
</script>

<template>
  <div>
    <h1>Total: {{ numOfTodo.total }}</h1>
    <h1>Task Completed: {{ numOfTodo.completed }}</h1>
    <h1>Task Remain: {{ numOfTodo.remain }}</h1>
  </div>
</template>

<style scoped>
div {
  padding-top: 20px;
}
</style>

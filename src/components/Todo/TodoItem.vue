<script lang="ts" setup>
import type { ITodo } from '@/interfaces/ITodo'
import { defineProps } from 'vue'
const { todo } = defineProps<{ todo: ITodo }>()
</script>

<template>
  <li :class="todo.completed && 'completed'">{{ todo.todo }}</li>
</template>

<style scoped>
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

li.completed {
  text-decoration: line-through;
  color: #ccc;
}
</style>

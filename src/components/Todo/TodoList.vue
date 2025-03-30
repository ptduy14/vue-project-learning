<script lang="ts" setup>
import type { ITodo } from '@/interfaces/ITodo'
import TodoItem from './TodoItem.vue'
import { defineProps } from 'vue'

const { todosFiltered, isFetching } = defineProps<{
  todosFiltered: ITodo[] | undefined
  isFetching: boolean
}>()

const emit = defineEmits(['update-todo'])
</script>

<template>
  <div v-if="isFetching">Loading</div>
  <div v-else-if="!todosFiltered">Cannot fetch to-do list</div>
  <ul v-else>
    <TodoItem
      v-for="todo in todosFiltered"
      :key="todo.id"
      :todo="todo"
      @click="() => emit('update-todo', todo.id)"
    />
  </ul>
</template>

<style scoped></style>

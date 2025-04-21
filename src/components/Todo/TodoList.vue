<script lang="ts" setup>
import type { ITodo } from '@/interfaces'
import TodoItem from './TodoItem.vue'
import { defineProps } from 'vue'

const { todosFiltered, isFetching, fetchErrorMsg } = defineProps<{
  todosFiltered: ITodo[] | undefined
  isFetching: boolean;
  fetchErrorMsg: string | undefined;
}>()

const emit = defineEmits(['update-todo', 'delete-todo'])
</script>

<template>
  <div v-if="isFetching">Loading</div>
  <div v-else-if="fetchErrorMsg !== undefined">Cannot fetch to-do list</div>
  <ul v-else>
    <TodoItem
      v-for="todo in todosFiltered"
      :key="todo.id"
      :todo="todo"
      @update-todo="(todoId: number) => emit('update-todo', todoId)"
      @delete-todo="(event: any, todoId: number) => emit('delete-todo', event, todoId)"
    />
  </ul>
</template>

<style scoped></style>

<script lang="ts">
interface IProps {
  todo: ITodo
}
</script>

<script lang="ts" setup>
import type { ITodo } from '@/interfaces'
import { defineProps } from 'vue'

const { todo } = defineProps<IProps>()
const emit = defineEmits(['update-todo', 'delete-todo'])
</script>

<template>
  <li @click="() => emit('update-todo', todo.id)">
    <span :class="todo.completed && 'completed'">{{ todo.todo }}</span>
    <span v-if="todo.completed" class="dl-btn" @click="(event: any) => emit('delete-todo', event, todo.id)">x</span>
  </li>
</template>

<style scoped>
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

span.completed {
  text-decoration: line-through;
  color: #ccc;
}

li > .dl-btn {
  color: red;
}
</style>

<script lang="ts" setup>
import { ref, watch, computed, reactive } from 'vue'

import TodoHeader from './TodoHeader.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import type { ITodo } from '@/interfaces/ITodo'
import type { INumOfTodo } from '@/interfaces/INumOfTodo'
import { todoService } from '@/services/todo-service'
import type { IStatus } from '@/interfaces/IStatus'

const todos = ref<ITodo[] | undefined>(undefined)
const errorMessage = ref<string>('')
const status = reactive<IStatus>({
  isAdding: false,
  isUpdating: false,
  isFetching: false,
})

const fetchTodos = async (selectedLimit: number) => {
  try {
    status.isFetching = true

    const res = await todoService.fetchTodos(selectedLimit)
    todos.value = res.todos
  } catch (error: any) {
    errorMessage.value = error.message
    console.log(errorMessage.value)
  } finally {
    status.isFetching = false
  }
}

const addTodo = async (inputValue: string) => {
  if (!inputValue.trim()) {
    return
  }

  try {
    status.isAdding = true

    const newTodo = await todoService.addTodo(inputValue)
    todos.value = [...todos.value!, newTodo]
  } catch (error: any) {
    console.log(error.message)
  } finally {
    inputValue = ''
    status.isAdding = false
  }
}

const todosFiltered = computed(() => {
  return todos.value?.filter((todo: ITodo) => !todo.deleted)
})

const numOfTodo = computed<INumOfTodo>(() => {
  if (!todosFiltered.value) {
    return { total: 0, completed: 0, remain: 0 }
  }

  let total = todosFiltered.value.length
  let todoCompleted = todosFiltered.value.filter((todo) => todo.completed).length
  let todoRemain = total - todoCompleted

  return { total, completed: todoCompleted, remain: todoRemain }
})

const updateTodo = async (todoId: number) => {
  try {
    status.isUpdating = true

    const index = todosFiltered.value?.findIndex((todo: ITodo) => todo.id === todoId)
    if (index === undefined || index === -1) return

    const todoUpdated = await todoService.updateTodo(todoId, !todosFiltered.value![index].completed)

    todos.value![index].completed = todoUpdated.completed
  } catch (error: any) {
    console.log(error.message)
  } finally {
    status.isUpdating = false
  }
}
</script>

<template>
  <div class="container">
    <TodoHeader
      :is-adding="status.isAdding"
      :fetch-todos="fetchTodos"
      @add-todo="(val) => addTodo(val)"
    />
    <TodoList
      :todos-filtered="todosFiltered"
      :is-fetching="status.isFetching"
      @update-todo="(todoId: number) => updateTodo(todoId)"
    />
    <TodoFooter :num-of-todo="numOfTodo" />
  </div>
</template>

<style scoped>
.container {
  max-width: 450px;
}
</style>

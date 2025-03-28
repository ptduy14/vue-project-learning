<script lang="ts" setup>
import { ref, watch } from 'vue'

import TodoHeader from './TodoHeader.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'

// temp definition of ITodo
interface ITodo {
  id: number
  title: string
  completed: boolean
}

const todos = ref<ITodo[] | undefined>(undefined)
const selectedLimit = ref<number>(5)
const errorMessage = ref<string>('')
const isFetching = ref<boolean>(false);

const fetchTodos = async (selectedLimit: number) => {
  try {
    isFetching.value = true;

    const res = await fetch(`https://dummyjson.com/todos?limit=${selectedLimit}&skip=10`)
    const data = await res.json();
    todos.value = data.todos;
  } catch (error: any) {
    errorMessage.value = error.message;
    console.log(errorMessage.value);
  } finally {
    isFetching.value = false;
  }
}

watch(
  () => selectedLimit.value,
  (newVal: number) => {
    fetchTodos(newVal)
  },
  { immediate: true },
)
</script>

<template>
  <div class="container">
    <TodoHeader />
    <TodoList :todos="todos" :is-fetching="isFetching"/>
    <TodoFooter />
  </div>
</template>

<style scoped>
.container {
  max-width: 350px;
}
</style>

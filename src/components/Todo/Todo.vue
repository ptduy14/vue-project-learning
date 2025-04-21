<script lang="ts" setup>
import { computed, ref } from 'vue'
import TodoHeader from './TodoHeader.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import TodoMessage from './TodoMessage.vue'
import type { INumOfTodo } from '@/interfaces/INumOfTodo'
import { useFetchTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from '@/composables'
import { addTodo, updateTodo, deleteTodo ,findIndex, filterRemainTodos, calculatorNumberOfTodo } from '@/utils/todo-func-core'

import type { ITodo } from '@/interfaces'

const todos = ref<ITodo[] | undefined>();

// fetch todos composable
const { isLoading: isFetching, fetchTodos, errMsg: fetchErrorMsg } = useFetchTodos((data: ITodo[]) => {
  todos.value = data
})

// add todo composable
const { addTodo: addTodoAPI, isLoading: isAdding, errMsg: addErrorMsg } = useAddTodo((newTodo: ITodo) => {
  todos.value = addTodo(todos.value, newTodo!)
})

// update todo composable
const { updateTodo: updateTodoAPI, isLoading: isUpdating, errMsg: updateErrorMsg } = useUpdateTodo((updatedTodo: ITodo) => {
  todos.value = updateTodo(todos.value!, updatedTodo)
})

// delete todo composable
const { deleteTodo: deleteTodoAPI, isLoading: isDeleting, errMsg: deleteErrorMsg } = useDeleteTodo((deletedTodo: ITodo) => {
  todos.value = deleteTodo(todos.value!, deletedTodo);
})


const handleAddTodo = (val: string) => {
  if (!val.trim()) {
    return;
  }
  
  clearErrorMessages();

  addTodoAPI(val);
}

const handleUpdateTodo = (todoId: number) => {
  if (isUpdating.value || todosFiltered.value === undefined) {
    return
  }

  clearErrorMessages();

  const index = findIndex(todosFiltered.value, todoId);
  const updateTodo = todosFiltered.value[index];
  const {id, ...payload} = updateTodo;

  updateTodoAPI(id, payload)
}

const handleDeleteTodo = (event: any, todoId: number) => {
  event.stopPropagation();
  
  if (isDeleting.value || todosFiltered.value === undefined) {
    return
  }

  clearErrorMessages();

  deleteTodoAPI(todoId);
}

const todosFiltered = computed(() => filterRemainTodos(todos.value))

const numOfTodo = computed<INumOfTodo>(() => calculatorNumberOfTodo(todos.value))

const clearErrorMessages = () => {
  addErrorMsg.value = undefined;
  updateErrorMsg.value = undefined;
  deleteErrorMsg.value = undefined;
};

</script>

<template>
  <div class="container">
    <TodoHeader :is-adding="isAdding" :fetch-todos="fetchTodos" @add-todo="handleAddTodo" />
    <TodoMessage :add-error-msg="addErrorMsg" :update-error-msg="updateErrorMsg" :delete-error-msg="deleteErrorMsg"/>
    <TodoList
      :todos-filtered="todosFiltered"
      :is-fetching="isFetching"
      :fetch-error-msg="fetchErrorMsg"
      @update-todo="handleUpdateTodo"
      @delete-todo="handleDeleteTodo"
    />

    <TodoFooter :num-of-todo="numOfTodo" />
  </div>
</template>

<style scoped>
.container {
  max-width: 450px;
}
</style>

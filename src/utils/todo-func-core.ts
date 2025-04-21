import type { INumOfTodo } from '@/interfaces/INumOfTodo'
import type { ITodo } from '@/interfaces'

export function filterRemainTodos (todos: ITodo[] | undefined): ITodo[] | undefined {
  return todos?.filter((todo: ITodo) => !todo.isDeleted)
}

export function calculatorNumberOfTodo(todos: ITodo[] | undefined): INumOfTodo {
  if (!todos) {
    return { total: 0, completed: 0, remain: 0 }
  }

  let total = todos.length
  let todoCompleted = todos.filter((todo) => todo.completed).length
  let todoRemain = total - todoCompleted

  return { total, completed: todoCompleted, remain: todoRemain }
}

export function findIndex(todos: ITodo[], todoId: number): number {
  const index = todos.findIndex((todo: ITodo) => todo.id === todoId)

  return index
}

export function addTodo(todos: ITodo[] | undefined, newTodo: ITodo): ITodo[] {
  const currentTodos = todos || []

  return [...currentTodos, newTodo]
}

export function updateTodo(todos: ITodo[], updatedTodo: ITodo): ITodo[] {
  return todos.map((todo: ITodo) => {
    if (updatedTodo.id === todo.id) {
      todo = updatedTodo
    }

    return todo;
  });
}

export function deleteTodo(todos: ITodo[], deletedTodo: ITodo): ITodo[] {
  return todos.map((todo: ITodo) => {
    if (deletedTodo.id === todo.id) {
      todo.isDeleted = deletedTodo.isDeleted
    }

    return todo;
  });
}
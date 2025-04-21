import type { ITodo } from '@/interfaces'
import type { TUpdatePayload } from '@/interfaces/ITodo'

// temporary declaration interface
interface IFetchTodosResponse extends ITodo {
  todos: ITodo[];
  total: number;
  skip: number;
  limit: number;
}

class TodoService {
  private domain: string

  constructor(domain: string = 'https://dummyjson.com') {
    this.domain = domain
  }
  

  async fetchTodos(selectedLimit: number): Promise<IFetchTodosResponse> {
    const res = await fetch(`${this.domain}/todos?limit=${selectedLimit}&skip=10`)

    if (!res.ok) {
      throw new Error(`Failed to fetch todos. Status: ${res.status}`)
    }

    const data: IFetchTodosResponse = await res.json();
    return data;
  }

  async addTodo(todo: string): Promise<ITodo> {
    const res = await fetch(`${this.domain}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: todo,
        completed: false,
        userId: 5,
      }),
    })

    if (!res.ok) {
      throw new Error(`Failed to add todo. Status: ${res.status}`)
    }

    const data: ITodo = await res.json()
    return data;
  }

  async updateTodo(todoId: number, payload: TUpdatePayload): Promise<ITodo> {
    const res = await fetch(`${this.domain}/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !payload.completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update todo. Status: ${res.status}`)
    }

    const data: ITodo = await res.json()
    return data;
  }

  async deleteTodo(todoId: number): Promise<ITodo> {
    const res = await fetch(`${this.domain}/todos/${todoId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error(`Failed to delete todo. Status: ${res.status}`)
    }

    const data: ITodo = await res.json()
    return data;
  }
}

export const todoService = new TodoService()

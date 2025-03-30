export const todoService = {
  fetchTodos: async (selectedLimit: number) => {
    const res = await fetch(`https://dummyjson.com/todos?limit=${selectedLimit}&skip=10`)
    
    if (!res.ok) {
        throw new Error(`Failed to fetch todos. Status: ${res.status}`)
      }
    
    return res.json()
  },

  addTodo: async (todo: string) => {
    const res = await fetch('https://dummyjson.com/todos/add', {
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

    return res.json()
  },

  updateTodo: async (todoId: number, completed: boolean) => {
    const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update todo. Status: ${res.status}`)
    }

    return await res.json()
  },
}

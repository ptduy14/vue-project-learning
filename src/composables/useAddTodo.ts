import type { ITodo } from '@/interfaces'
import { todoService } from '@/services/todo-service'
import { ref, type Ref } from 'vue'

type TSuccessHandler = (newTodo: ITodo) => void

interface IUseAddTodo {
  isLoading: Ref<boolean>
  errMsg: Ref<string | undefined>
  addTodo: (todoName: string) => Promise<void>
}

export function useAddTodo(successHandler: TSuccessHandler): IUseAddTodo {
  const isLoading = ref<boolean>(false)
  const errMsg = ref<string | undefined>()

  const addTodo = async (todoName: string): Promise<void> => {
    try {
      isLoading.value = true
      
      const newTodo = await todoService.addTodo(todoName)
      successHandler(newTodo);
    } catch (error) {
      if (error instanceof Error) {
        errMsg.value = error.message
        console.log(errMsg.value);
      }      
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    addTodo,
    errMsg,
  }
}

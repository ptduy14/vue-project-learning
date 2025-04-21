import { ref } from 'vue'
import type { Ref } from 'vue'
import type { ITodo } from '@/interfaces'
import { todoService } from '@/services/todo-service'

type TSuccessHandler = (deletedTodo: ITodo) => void

interface IUseDeleteTodo {
  isLoading: Ref<boolean>;
  deleteTodo: (todoId: number) => Promise<void>;
  errMsg: Ref<string | undefined>;
}

export function useDeleteTodo(successHandler: TSuccessHandler): IUseDeleteTodo {
  const isLoading = ref<boolean>(false);
  const errMsg = ref<string | undefined>()

  const deleteTodo = async (
    todoId: number,
  ) => {
    try {
      isLoading.value = true
      
      const deletedTodo = await todoService.deleteTodo(todoId);
      successHandler(deletedTodo);
    } catch (error: any) {
      if (error instanceof Error) {
        errMsg.value = error.message
        console.log(errMsg.value);
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    errMsg,
    deleteTodo,
    isLoading
  }
}

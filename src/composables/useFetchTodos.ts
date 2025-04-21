import type { ITodo } from '@/interfaces'
import { todoService } from '@/services/todo-service'
import { ref, type Ref } from 'vue'

type TSuccessHandler = (todos: ITodo[]) => void

interface IUseFetchTodos {
    isLoading: Ref<boolean>,
    errMsg: Ref<string | undefined>,
    fetchTodos: () => Promise<void>
}

export function useFetchTodos(successHandler: TSuccessHandler): IUseFetchTodos {
  const isLoading = ref<boolean>(false)
  const errMsg = ref<string | undefined>()

  const fetchTodos = async (selectedLimit: number = 5): Promise<void> => {
    try {
      isLoading.value = true;

      const res = await todoService.fetchTodos(selectedLimit);
      successHandler(res.todos);
    } catch (error: any) {
      errMsg.value = error.message;
      console.log(errMsg);
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    errMsg,
    fetchTodos,
  }
}

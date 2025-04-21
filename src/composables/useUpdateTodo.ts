import type { ITodo } from "@/interfaces";
import { todoService } from "@/services/todo-service";
import { type Ref, ref } from "vue";
import type { TUpdatePayload } from "@/interfaces/ITodo";

type TSuccessHandler = (updatedTodo: ITodo) => void;

interface IUseUpdateTodo {
    isLoading: Ref<boolean>,
    errMsg: Ref<string | undefined>,
    updateTodo: (id: number, payload: TUpdatePayload) => Promise<void>
}

export function useUpdateTodo(successHandler: TSuccessHandler): IUseUpdateTodo {
    const isLoading = ref<boolean>(false);
    const errMsg = ref<string | undefined>();

    const updateTodo = async (id: number, payload: TUpdatePayload) => {
        try {
            isLoading.value = true;

            const updatedTodo = await todoService.updateTodo(id, payload);
            successHandler(updatedTodo);
        } catch (error: any) {
            errMsg.value = error.message;
            console.log(error.message)
        } finally {
            isLoading.value = false;
        }
    }

    return {
        updateTodo,
        errMsg, 
        isLoading
    }
}
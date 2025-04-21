export interface ITodo {
    id: number,
    todo: string,
    completed: boolean,
    isDeleted: boolean
}

export type TUpdatePayload = Omit<ITodo, "id">;
import type { States, TodoItem } from "../components/TodoList";

export const dragAndDrop = (todos:TodoItem[], toId:number, fromId: number) => {
    
    const toIndex = todos.findIndex((el) => el.id === toId)
    const fromIndex = todos.findIndex((el) => el.id === fromId)
    if(toIndex === -1 || fromIndex === -1) return todos;
    todos.splice(toIndex, 0, todos.splice(fromIndex, 1)[0])
    return todos;
}

export const initialState: States = {
  todoList: [],
};
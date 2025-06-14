import { useTodoContext } from "../hooks/useTodoContext";
import { TodoItem } from "./TodoItem";

export const ActionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DnD_TODO: "DnD_TODO",
} as const;

export type Action =
  | { type: typeof ActionTypes.ADD_TODO; payload: { text: string } }
  | { type: typeof ActionTypes.TOGGLE_TODO; payload: { id: number } }
  | {
      type: typeof ActionTypes.DnD_TODO;
      payload: { toId: number; fromId: number };
    };

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface States {
  todoList: TodoItem[];
}

export const TodoList = () => {
  const { state, dispatch } = useTodoContext();
  return (
    <div>
      {state.todoList.map((el) => {
        return (
          <div key={el.id}>
            <TodoItem todoId={el.id} todoText={el.text} />
            <input
              onClick={() =>
                dispatch({
                  type: ActionTypes.TOGGLE_TODO,
                  payload: { id: el.id },
                })
              }
              checked={el.completed}
              type="checkbox"
            />
          </div>
        );
      })}
    </div>
  );
};

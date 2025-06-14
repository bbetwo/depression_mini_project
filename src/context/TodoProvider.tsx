import { useReducer, type ReactNode } from "react";
import {
  ActionTypes,
  type Action,
  type States,
  type TodoItem,
} from "../components/TodoList";
import { TodoContext } from "./TodoContext";
import { dragAndDrop } from "../utils/utils";

export interface StateReducer {
  todoList: TodoItem[];
}

const initialState: StateReducer = {
  todoList: [],
};

const reducer = (state: States, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO: {
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    }
    case ActionTypes.TOGGLE_TODO: {
      return {
        ...state,
        todoList: state.todoList.map((el) =>
          el.id === action.payload.id ? { ...el, completed: !el.completed } : el
        ),
      };
    }
    case ActionTypes.DnD_TODO: {
      const copyState = dragAndDrop(
        [...state.todoList],
        action.payload.toId,
        action.payload.fromId
      );
      return {
        ...state,
        todoList: copyState,
      };
    }
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

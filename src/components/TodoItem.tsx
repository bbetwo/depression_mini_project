import { useTodoContext } from "../hooks/useTodoContext";
import { ActionTypes } from "./TodoList";

interface TodoProps {
  todoId: number;
  todoText: string;
}

export const TodoItem = ({ todoId, todoText }: TodoProps) => {
  const { dispatch } = useTodoContext();

  const handleDragDrop = (fromId: number, toId: number) => {
    dispatch({
      type: ActionTypes.DnD_TODO,
      payload: { fromId: fromId, toId: toId },
    });
  };

  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", todoId.toString());
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleDragDrop(Number(e.dataTransfer.getData("text/plain")), todoId);
      }}
    >
      {todoText}
    </li>
  );
};

import { useState } from "react";
import "./App.css";
import { ActionTypes, TodoList } from "./components/TodoList";

import { useTodoContext } from "./hooks/useTodoContext";

// type TodoItem = {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// type ActionTypes =
// | {type:'add_todo'; payload: {text:string}}
// | {type:'toggle_completed'; payload: {id: number}}
// | {type:'DnD'; payload: {dragItem: number; toDragItem: number}}

//  export interface StateReducer {
//   todoList: TodoItem[];
// }
// const initialState:StateReducer = {
//       todoList: []
// }

function App() {
  const [name, setName] = useState<string>("sss");

  //   const reducer = (state:StateReducer, action:ActionTypes)=> {
  //     switch(action.type){
  //       case'add_todo':

  //       return {
  //         ...state,
  //         todoList:[
  //           ...state.todoList,
  //           {
  //             id: Date.now(),
  //             text: action.payload.text,
  //             completed:false,
  //           }
  //         ]
  //       }
  //       case'toggle_completed':
  //       return {
  //         ...state,
  //         todoList: state.todoList.map((el)=>
  //           el.id === action.payload.id ?
  //               {...el, completed: !el.completed}
  //               : el )
  //       }
  //       case'DnD':{
  //       const newState = [...state.todoList];
  //       const itemD = newState.findIndex((el)=> el.id === action.payload.dragItem);
  //       const toItemD = newState.findIndex((el)=> el.id === action.payload.toDragItem);
  //       newState.splice(toItemD, 0, newState.splice(itemD, 1)[0])

  //       return {
  //         ...state,
  //         todoList: newState
  //       }}

  //       default: return state;

  //     }
  //   }

  //   const handleDragDrop = (di:number,td:number) => {
  //     dispatch({type:'DnD', payload:{dragItem:di, toDragItem: td}})
  //   }

  const { dispatch } = useTodoContext();

  return (
    <>
      <TodoList />
      <div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (name.trim()) {
              dispatch({
                type: ActionTypes.ADD_TODO,
                payload: {
                  text: name,
                },
              });
              setName("");
            }
          }}
        >
          <input
            value={name}
            type="text"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.currentTarget.value);
              setName(e.currentTarget.value);
            }}
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default App;

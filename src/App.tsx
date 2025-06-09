import { useReducer, useState } from 'react'
import './App.css'

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
}

// interface ActionType {
//   type: string;
//   payload: {
//     id:number;
//     text: string;
//   }
// }

type ActionTypes = 
| {type:'add_todo'; payload: {text:string}}
| {type:'toggle_completed'; payload: {id:number}}
| {type:'DnD'; payload: {dragItem: number; toDragItem: number}}

interface StateReducer {
  todoList: TodoItem[];
}

function App() {
  const[name, setName] = useState<string>('sss')
  const [dragItem, setDragItem] = useState<number>(0)

  const initialState:StateReducer = {
    todoList: []
  }

  const reducer = (state:StateReducer, action:ActionTypes):StateReducer => {
    switch(action.type){
      case'add_todo':
      return {
        ...state,
        todoList:[
          ...state.todoList,
          {
            id: Date.now(),
            text: action.payload.text,
            completed:false,
          }
        ]
      }
      case'toggle_completed':
      return {
        ...state,
        todoList: state.todoList.map((el)=> 
          el.id === action.payload.id ? 
              {...el, completed
            : !el.completed}: el )
      }
      case'DnD':{
      const newState = [...state.todoList];
      const itemD = newState.findIndex((el)=> el.id === action.payload.dragItem);
      const toItemD = newState.findIndex((el)=> el.id === action.payload.toDragItem);
      // const[del] = newState.splice(itemD, 1)
      // newState.splice(toItemD, 0, del);
      newState.splice(toItemD, 0, newState.splice(itemD, 1)[0])
    
      return {
        ...state,
        todoList: newState
      }}

      default: return state;

    }
  }
  const [state, dispatch] = useReducer(reducer,initialState)
  const handleDragDrop = (di:number,td:number) => {
    dispatch({type:'DnD', payload:{dragItem:di, toDragItem: td}})
  }
  return (
    <>
      <div>
        {state?.todoList.map((el) => {
          return(
          <div key={el.id}>
              <li draggable
              onDragStart={()=>{
                console.log(el.id);
                
                setDragItem(el.id)}}
              onDragOver={(e)=> e.preventDefault()}
              onDrop={(e)=> {
                console.log(el.id);
                e.preventDefault();
                handleDragDrop(dragItem,el.id)}}
              >{el.text}</li>
              <input  onClick={()=> dispatch({type:'toggle_completed', payload:{id: el.id}}) } checked={el.completed} type="checkbox"   />
          </div>)
        })}
      </div>
      <div>
      <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name.trim()){
          dispatch({
            type: 'add_todo',
            payload:{
              text: name ,
            }
          })
          setName('')
        }
        console.log('pustaya stroka ss');
        
      }}>
        <input value={name} type="text" onInput={(e:React.InputEvent<HTMLInputElement>)=> {
          console.log(e.currentTarget.value); 
          setName(e.currentTarget.value)
        }} />
      

        <button type="submit">Save</button>
      </form>
      </div>
    </>
  )
}

export default App

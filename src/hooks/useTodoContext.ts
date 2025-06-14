import { useContext } from "react"
import { TodoContext } from "../context/TodoContext";


export const useTodoContext = () => {
    const context = useContext(TodoContext)
    
    return context;
}
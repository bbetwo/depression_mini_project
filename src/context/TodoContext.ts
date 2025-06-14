import { createContext } from "react";
import {  type Action, type States } from "../components/TodoList";
import { initialState } from "../utils/utils";


interface ContextType {
    state: States
    dispatch: React.Dispatch<Action>
}

export const TodoContext = createContext<ContextType >({state:initialState , dispatch:() => {}});
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ListItemType = {
    id: number,
    title: string,
    description?: string,
    completed: boolean,
}

type TodoListType = ListItemType[];

const initialState: TodoListType = [
    
    {   
        id: 1,
        title: "Check this app",
        description: "Title is self-explanatory",
        completed: true,
    },
    {   
        id: 2,
        title: "Create new task",
        description: "Just click \"New task\"",
        completed: false,
    },
    {   
        id: 3,
        title: "Edit existing task",
        description: "Click \"Edit\" down below and change this text, then click \"Ok\"",
        completed: false,
    },
    {   
        id: 4,
        title: "Mark all completed tasks",
        description: "Click \"Set Done\" under each completed task",
        completed: false,
    },
   
    {
        id: 5,
        title: "Give a job offer",
        description: "Contact Oleksandr and give him an offer :)",
        completed: false,
    }
]

export const todoListSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
       
        deleteTodo: (state, action: PayloadAction<number>) => {
          return state.filter((item) => item.id !== action.payload);
        },
        doneTodo: (state, action: PayloadAction<number>) => {
            console.log("done ", action.payload);
          return state.map(item =>
            item.id === action.payload ? { ...item, completed: !item.completed } : item
          );
        },
        editTodo: (state, action: PayloadAction<ListItemType>) => {
            return [...state, action.payload]
        }
    }
})

export const { deleteTodo, doneTodo, editTodo} = todoListSlice.actions

export default todoListSlice.reducer;
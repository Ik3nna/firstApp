import { createSlice } from "@reduxjs/toolkit";

let id = 0;

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos_List: []
    },
    reducers: {
        addTodo (state, action) {
            state.todos_List = [...state.todos_List, { id: ++id, ...action.payload }]
        },
        deleteTodo (state, action) {

        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice;
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos_List: []
    },
    reducers: {
        addTodo (state, action) {

        },
        deleteTodo (state, action) {

        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice;
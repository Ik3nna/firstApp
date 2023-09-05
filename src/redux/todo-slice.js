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
        updateTodo (state, action) {
            const { id, ...updatedTask } = action.payload;
            const index = state.todos_List.findIndex((task) => task.id === id);
            if (index !== -1) {
            state.todos_List[index] = { ...state.todos_List[index], ...updatedTask };
            }
        },
        deleteTodo (state, action) {

        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice;
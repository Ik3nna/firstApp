import { createSlice } from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos_List: []
    },
    reducers: {
        addTodo (state, action) {
            state.todos_List = [...state.todos_List, { id: uuidv4(), ...action.payload }]
        },
        updateTodo (state, action) {
            const { id, ...updatedTask } = action.payload;
            const index = state.todos_List.findIndex((task) => task.id === id);
            if (index !== -1) {
                state.todos_List[index] = { ...state.todos_List[index], ...updatedTask };
            }
        },
        deleteTodo (state, action) {
            state.todos_List = [...state.todos_List.filter(todo => todo.id !== action.payload)];
        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice;
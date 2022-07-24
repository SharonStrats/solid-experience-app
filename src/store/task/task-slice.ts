import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

// in action you can have a payload
const taskSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        increment(state, action) {
            state.counter++;
        },
    }
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
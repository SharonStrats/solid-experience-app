import { createSlice, configureStore } from '@reduxjs/toolkit'
import addressReducer from './address/address-slice'
import taskReducer from './task/task-slice'

// UI reducer to toggle which apps are displayed and how they are configured on
// the screen
const store = configureStore({
    reducer: {
        address: addressReducer,
        task: taskReducer
    }
});

export default store;
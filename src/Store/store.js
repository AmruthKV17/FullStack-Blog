import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice.js"

const store = configureStore({
    reducer : {
        auth : authReducer,
        // TODO: Add another reducer for post 
    }
})

export default store;
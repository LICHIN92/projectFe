import { configureStore } from "@reduxjs/toolkit";
import user  from './userSlice.js'
import loaderSlice from "./loaderSlice.js";
export default configureStore({
    reducer:{
        user:user,
        loading:loaderSlice
    }
})
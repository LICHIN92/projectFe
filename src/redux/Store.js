import { configureStore } from "@reduxjs/toolkit";
import user  from './userSlice.js'
// import general from './GeneralSlice';
export default configureStore({
    reducer:{
        user:user,
        // general:general
    }
})
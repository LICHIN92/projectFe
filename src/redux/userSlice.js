// import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

// const token=localStorage.getItem("token")
// const USER=token ? jwtDecode(token)._doc : null;
// // Initial state
// const INITIAL_STATE = {
//   user:USER || {}
// };

// // Create user slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState: INITIAL_STATE,
//   reducers: {
//     setUserData: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUserData: (state) => {
//       state.user = {};
//     }
//   },
// });

// // Export actions
// export const { setUserData, clearUserData } = userSlice.actions;

// // Export reducer
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem("token");

const USER = token ? jwtDecode(token)._doc : null;
// const USER=JSON.parse(localStorage.getItem('user'))|| {}

const INITIAL_STATE = {
  user: USER || {} 
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = {};
    }
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;

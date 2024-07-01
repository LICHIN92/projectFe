import { createSlice } from "@reduxjs/toolkit";
const Initial_State={
    showloader:false
}
const loaderSlice=createSlice({
    name:'loading',
    initialState:Initial_State,
    reducers:{
        showOrHideLoader:(state,action)=>{
            state.showloader=action.payload
        }
    }
})
export const {showOrHideLoader}=loaderSlice.actions
export default loaderSlice.reducer
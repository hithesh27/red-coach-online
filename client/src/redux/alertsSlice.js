import {createSlice} from '@reduxjs/toolkit'


const initialState={
    loading:false
}
const alertSlice=createSlice({
    name:"alerts",
    initialState:initialState,
    reducers:{
        showLoading:(state)=>{
            state.loading=true
        },
        hideLoading:(state)=>{
            state.loading=false
        }
    }
})

export const showLoading = alertSlice.actions.showLoading;
export const hideLoading=alertSlice.actions.hideLoading;
const  alertReducer =alertSlice.reducer;
export default alertReducer;
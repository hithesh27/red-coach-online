import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:{
        isAdmin:false
    }
}
const usersSlice=createSlice({
 name:"users",
 initialState:initialState,
 reducers:{
    setUser:(state,action)=>{
        state.user=action.payload;
    }
 }   
}
)

export const {setUser} =usersSlice.actions
const usersReducer=usersSlice.reducer;
export default usersReducer
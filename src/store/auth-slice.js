import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:'Auth',
    initialState: {isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        }
    }
})
export const AuthAction=authSlice.actions;
export default authSlice;
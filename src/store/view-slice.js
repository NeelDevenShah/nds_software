import { createSlice } from "@reduxjs/toolkit";
const viewSlice=createSlice({
    name: 'view',
    initialState: {view_mainNavbar: false, view_stockNavbar: false, view_accountNavbar: false, view_ownerNavbar: false, view_dealerNavbar: false, view_loggedInNavbar:false},
    reducers:{
        do_view_main(state){
            state.view_mainNavbar=true;
            state.view_stockNavbar=false;
            state.view_accountNavbar=false;
            state.view_ownerNavbar=false;
            state.view_dealerNavbar=false;
            state.view_loggedInNavbar=false;
        },
        do_view_main_loggedIn(state){
            state.view_mainNavbar=false;
            state.view_stockNavbar=false;
            state.view_accountNavbar=false;
            state.view_ownerNavbar=false;
            state.view_dealerNavbar=false;
            state.view_loggedInNavbar=true;
        },
        do_view_stock(state){
            state.view_mainNavbar=false;
            state.view_stockNavbar=true;
            state.view_accountNavbar=false;
            state.view_ownerNavbar=false;
            state.view_dealerNavbar=false;
            state.view_loggedInNavbar=false;
        },
        do_view_account(state){
            state.view_mainNavbar=false;
            state.view_stockNavbar=false;
            state.view_accountNavbar=true;
            state.view_ownerNavbar=false;
            state.view_dealerNavbar=false;
            state.view_loggedInNavbar=false;
        },
        do_view_owner(state){
            state.view_mainNavbar=false;
            state.view_stockNavbar=false;
            state.view_accountNavbar=false;
            state.view_ownerNavbar=true;
            state.view_dealerNavbar=false;
            state.view_loggedInNavbar=false;
        },
        do_view_dealer(state){
            state.view_mainNavbar=false;
            state.view_stockNavbar=false;
            state.view_accountNavbar=false;
            state.view_ownerNavbar=false;
            state.view_dealerNavbar=true;
            state.view_loggedInNavbar=false;
        },
    }
})

export const ViewActions=viewSlice.actions;
export default viewSlice;
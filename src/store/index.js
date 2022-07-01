import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import viewSlice from "./view-slice";

const store=configureStore({
    reducer :{
        auth: authSlice.reducer,
        view: viewSlice.reducer,
    }
})
export default store;
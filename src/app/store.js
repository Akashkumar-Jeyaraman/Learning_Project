import { configureStore } from "@reduxjs/toolkit";
import UserListReducer from '../features/UserSlice'
export const store = configureStore({
    reducer:{
      userList: UserListReducer
    }
})
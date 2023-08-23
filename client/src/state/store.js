import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.js'
import wishListReducer from './slices/wishListSlice.js'
import cartReducer from './slices/cartSlice.js'
import bookReducer from './slices/bookSlice.js'

const store=configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        wishlist:wishListReducer,
        book:bookReducer
    }
})

export default store
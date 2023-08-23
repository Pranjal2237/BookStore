import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Axios from 'axios'

export const addToWishList=createAsyncThunk('user/addtocart',async(id)=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.post(`${process.env.REACT_APP_URL}/user/wishlist/${id}`,{},{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const removeToWishList=createAsyncThunk('user/removetocart',async(id)=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.delete(`${process.env.REACT_APP_URL}/user/wishlist/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const allWishList=createAsyncThunk('user/wishlist',async()=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.get(`${process.env.REACT_APP_URL}/user/wishlist`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

const wishListSlice=createSlice({
    name:'cart',
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(addToWishList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(addToWishList.rejected,(state)=>{
            state.error=true;
        })
        .addCase(removeToWishList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(removeToWishList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(removeToWishList.rejected,(state)=>{
            state.error=true;
        })
        .addCase(allWishList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(allWishList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(allWishList.rejected,(state)=>{
            state.error=true;
        })
    }
})

export default wishListSlice.reducer;
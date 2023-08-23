import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Axios from 'axios'

export const addToCart=createAsyncThunk('user/addtocart',async(id)=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.post(`${process.env.REACT_APP_URL}/user/cart/${id}`,{},{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const removeToCart=createAsyncThunk('user/removetocart',async(id)=>{
    try {
        console.log(id)
        const token=sessionStorage.getItem("token")
        const response=await Axios.delete(`${process.env.REACT_APP_URL}/user/cart/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const allCart=createAsyncThunk('user/cart',async()=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.get(`${process.env.REACT_APP_URL}/user/cart`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(addToCart.rejected,(state)=>{
            state.error=true;
        })
        .addCase(removeToCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(removeToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(removeToCart.rejected,(state)=>{
            state.error=true;
        })
        .addCase(allCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(allCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(allCart.rejected,(state)=>{
            state.error=true;
        })
    }
})

export default cartSlice.reducer;
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Axios from 'axios'

export const loginUser=createAsyncThunk('user/login',async(body)=>{
    try{
        const response=await Axios.post(`${process.env.REACT_APP_URL}/user/login`,body);
        const {token}=response.data;
        sessionStorage.setItem("token",token)
        return response.data;
    }catch(error){
        console.log(error.message);
    }
})

export const signupUser=createAsyncThunk('user/signup',async(body)=>{
    try{
        const response=await Axios.post(`${process.env.REACT_APP_URL}/user/signup`,body);
        const {token}=response.data;
        sessionStorage.setItem("token",token)
        return response.data;
    }catch(error){
        console.log(error.message);
    }
})

export const loadUser=createAsyncThunk('user',async(token)=>{
    try {
        const response=await Axios.get(`${process.env.REACT_APP_URL}/user`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
})

export const addAddress=createAsyncThunk('user/address',async(address)=>{
    try {
        const token=sessionStorage.getItem("token");
        const response=await Axios.patch(`${process.env.REACT_APP_URL}/user/address`,{address},{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    reducers:{
        logout:(state)=>{
            state.data=null;
            sessionStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.error=true;
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error=true;
        })
        .addCase(loadUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.error=true;
        })
        .addCase(addAddress.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        .addCase(addAddress.rejected,(state,action)=>{
            state.error=true;
        })
    }
})

export const {logout}=userSlice.actions

export default userSlice.reducer;
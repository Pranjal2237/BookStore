import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Axios from 'axios'

export const uploadBook=createAsyncThunk('user/uploadbook',async(body)=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.post(`${process.env.REACT_APP_URL}/user/uploadbook`,body,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const myBooks=createAsyncThunk('user/mybooks',async()=>{
    try {
        const token=sessionStorage.getItem("token")
        const response=await Axios.get(`${process.env.REACT_APP_URL}/user/mybooks`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
})

export const allBooks=createAsyncThunk('allbooks',  async ({
    currentPage = 1,
    genre,
    priceSort = 0,
    priceL = 0,
    priceH = 10000000000,
    bookname = null,
  }) => {
    let link = `${process.env.REACT_APP_URL}/books?bookname=${bookname}&page=${currentPage}&priceSort=${priceSort}&price[gte]=${priceL}&price[lte]=${priceH}`;

    if (genre) {
      link = `${process.env.REACT_APP_URL}/books?bookname=${bookname}&page=${currentPage}&priceSort=${priceSort}&price[gte]=${priceL}&price[lte]=${priceH}&genre=${genre}`;
    }

    const response = await Axios.get(link);
    return response.data;
  })

const bookSlice=createSlice({
    name:'book',
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(uploadBook.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(uploadBook.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(uploadBook.rejected,(state)=>{
            state.error=true;
        })
        .addCase(myBooks.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(myBooks.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(myBooks.rejected,(state)=>{
            state.error=true;
        })
        .addCase(allBooks.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(allBooks.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(allBooks.rejected,(state)=>{
            state.error=true;
        })
    }
})

export default bookSlice.reducer;
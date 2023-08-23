import React,{useEffect, useState} from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Navbar from './scenes/navbar'
import Home from './scenes/home'
import Cart from './scenes/cart'
import WishList from './scenes/wishlist'
import Login from './scenes/loginPage'
import Signup from './scenes/signupPage'
import { useDispatch } from 'react-redux'
import { loadUser } from './state/slices/userSlice'
import MyBook from './scenes/mybook'
import UploadBook from './scenes/uploadBook'

const App = () => {
  const [bookname, setbookname] =useState("");
  const dispatch=useDispatch();
  useEffect(()=>{
    const token=sessionStorage.getItem("token")
    dispatch(loadUser(token));
  },[])
  return (
    <div>
      <BrowserRouter>
        <Navbar setKeyword={setbookname}/>
        <Routes>
          <Route path="/" element={<Home bookname={bookname} />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/user/wishlist' element={<WishList/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/user/mybook' element={<MyBook/>} />
          <Route path='/user/uploadbook' element={<UploadBook/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


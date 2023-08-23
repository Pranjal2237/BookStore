import React, { useState } from 'react'
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { uploadBook } from '../../state/slices/bookSlice';

const UploadBook = () => {
    const[uploadbook,setUploadBook]=useState({})
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        setUploadBook({...uploadbook,[e.target.name]:e.target.value})
    }
    const handleFile=(e)=>{
        setUploadBook({...uploadbook,picture:e.target.files[0],picturePath:e.target.files[0].name})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        for (let value in uploadbook) {
            console.log(value,uploadbook[value])
            formData.append(value, uploadbook[value]);
          }
        dispatch(uploadBook(formData))
    }
  return (
    <Box>
    <Box
      sx={{
        maxWidth:"30%",
        m:"auto",
        marginTop: "4rem",
        marginBottom: "5rem",
        color: "gray",
        boxShadow: "#C2C5E1 0px 8px 10px",
        p: "2rem",
        color:"#9096B2"
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontSize: "25px", fontWeight: "700", color: "black" }}
        >
          Upload Book
        </Typography>
      </Box>
      <Box marginTop="1.5rem">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              ">input": {
                height: "35px",
                marginTop: "15px",
                outline: "none",
                border: "1px solid gray",
                pl: "10px",
              },
              ">textarea":{
                height: "100px",
                marginTop: "15px",
                outline: "none",
                border: "1px solid gray",
                pl: "10px",
              }
            }}
          >
            <input type="text" placeholder="Enter BookName" name='bookname' value={uploadbook.name} onChange={(e)=>handleChange(e)} />
            <input type="text" placeholder="Enter Genre" name='genre' value={uploadbook.email} onChange={(e)=>handleChange(e)} />
            <input type="Number" placeholder="Enter Price" min={0} name='price' value={uploadbook.password} onChange={(e)=>handleChange(e)} />
            <input type='file' accept='image/*' placeholder='Select image' onChange={(e)=>{handleFile(e)}} />
            <textarea name='summary' onChange={(e)=>{handleChange(e)}} placeholder='Enter Summary of Book' />
            <Button
              type="submit"
              sx={{
                background: "#FB2E86",
                color: "white",
                marginTop: "35px",
                textTransform:"none",
                "&:hover": { background: "#FB2E86" },
              }}
            >
              Upload Book
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
    </Box>
  )
}

export default UploadBook
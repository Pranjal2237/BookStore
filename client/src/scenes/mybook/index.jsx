import React, { useEffect } from 'react'
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { myBooks } from '../../state/slices/bookSlice';

const MyBook = () => {
    const state=useSelector((state)=>state)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(myBooks());
    },[])
  return (
    <Box sx={{ width: "70%",margin:"auto" }}>
      {state?.book?.data?.length === 0 ? (
        <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
          No Product Found!!
        </Typography>
      ) : (
        state?.book?.data?.map((book, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: "10px",
                m: "14px 0px",
                width: "100%",
                gap: "2rem",
              }}
            >
              <Box
                sx={{
                  width: "20%",
                  backgroundColor: "#F5F5F5",
                  p: "25px 0px",
                  flexShrink: "0",
                }}
              >
                <Link
                  to={`/book/${book._id}`}
                  style={{ display: "flex", width: "100%" }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL}/assets/${book.picturePath}`}
                    alt=""
                    style={{ width: "80%", objectFit: "cover", margin: "auto" }}
                  />
                </Link>
              </Box>
              <Box sx={{ flexGrow: "1" }}>
                <Typography sx={{ fontWeight: "800", color: "#111C85" }}>
                  {book.bookname}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#535399",
                    mb: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "700" }}>
                    Rs. {book.price}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#9295AA", fontSize: "11px", mb: "5px" }}
                >
                  {book.summary}
                </Typography>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  )
}

export default MyBook
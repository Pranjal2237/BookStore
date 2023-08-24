import React, { useEffect, useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/slices/cartSlice";
import {
  removeToWishList,
  addToWishList,
  allWishList
} from "../state/slices/wishListSlice";


const ProductCard = () => {
  const [isWishListed, setisWishListed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let a = [];

  const StyledButton = styled(Button)({
    minWidth: "0px",
  });

  const handleAdd = (product_id, product_name) => {
    dispatch(addToCart( product_id ));
    if (state?.user?.data == null) {
      navigate("/login");
    } else {
      alert(`${product_name} added to your cart`);
    }
  };

  const handleRemoveWishlist = (product_id) => {
    let wishlist_id;
    state?.wishlist?.data?.products.forEach((key) => {
      if (key.wishListProduct.product_id === product_id) {
        wishlist_id = key._id;
      }
    });
    dispatch(removeToWishList(wishlist_id));
    setisWishListed(!isWishListed);
  };

  const handleWishList = (product_id,product_name) => {
    dispatch(addToWishList(product_id));
    if (state?.wishlist?.error) {
      navigate("/login");
    }else {
      alert(`${product_name} added to your wishlist`);
    }
  };

  useEffect(() => {
    dispatch(allWishList());
  }, [state.wishlist?.data?.wishList, state.wishlist?.data?.message]);

  if (state?.wishlist?.data?.length > 0) {
    state?.wishlist?.data?.forEach((key) => {
      a.push(key.wishListProduct.product_id);
    });
  }

  if (!state?.book?.data) {
    return <h1>Loading.........</h1>;
  }

  return (
    <Box sx={{ width: "60%" }}>
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
                  width: "40%",
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
                <StyledButton
                  onClick={() => handleAdd(book._id, book.bookname)}
                >
                  <ShoppingCartOutlinedIcon fontSize="1.2rem" />
                </StyledButton>
                {a.includes(book._id) ? (
                  <StyledButton
                    onClick={() => {
                      handleRemoveWishlist(book._id);
                    }}
                  >
                    <FavoriteIcon sx={{ color: "red" }} fontSize="1.2rem" />
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => {
                      handleWishList(book._id,book);
                    }}
                  >
                    <FavoriteBorderOutlinedIcon fontSize="1.2rem" />
                  </StyledButton>
                )}
                <StyledButton>
                  <ZoomInOutlinedIcon fontSize="1.2rem" />
                </StyledButton>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ProductCard;

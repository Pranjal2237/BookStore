import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartTotal from "../../components/CartTotal";
import CartTable from "../../components/CartTable";
import EmptyItem from "../../components/EmptyItem";
import emptyCart from "../../assets/images/emptyCart.png";
import { allCart } from "../../state/slices/cartSlice";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState({});
  const dispatch=useDispatch();
  const state = useSelector((state) => state);

  const totalCount = (info) => {
    setCartTotal(info);
  };

  useEffect(()=>{
    dispatch(allCart());
  },[])

  return (
    <Box>
    <Box className="container" sx={{display:"flex",justifyContent:"space-between",alignItems:"start",mt:"40px",mb:"40px"}}>
      {state?.cart?.data?.length > 0 ? (
        <CartTable />
      ) : (
        <EmptyItem
          image={emptyCart}
          title="Hey,it feels so light!"
          description="There is nothing in your cart,Let's add some items"
          buttonContent="Add Items from WishList"
          navigation="/user/wishlist"
          maxwidth="30%"
        />
      )}
      {state?.cart?.data?.length > 0 && (
        <Box
          textAlign="center"
          sx={{
            ">p": { fontWeight: "bolder" },
            ">a": { textDecoration: "none" },
            flexBasis:"30%",
            position:"sticky",
            top:"0"
          }}
        >
          <Typography sx={{color:"#1D3178",fontWeight:"600",fontSize:"14px"}}>Cart Totals</Typography>
          <CartTotal totalCount={totalCount} />
            <Button
              sx={{
                textTransform: "none",
                background: "#FB2E86",
                color: "white",
                "&:hover": { background: "#FB2E86" },
                mt: "30px",
                width: "100%",
              }}
            >
              PLACE ORDER
            </Button>
        </Box>
      )}
    </Box>
    </Box>
  );
};

export default Cart;

import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartTotal from "../../components/CartTotal";
import CartTable from "../../components/CartTable";
import EmptyItem from "../../components/EmptyItem";
import emptyCart from "../../assets/images/emptyCart.png";
import { allCart } from "../../state/slices/cartSlice";
import { addAddress } from "../../state/slices/userSlice";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState({});
  const [address,setAddress]=useState();
  const dispatch=useDispatch();
  const state = useSelector((state) => state);

  const totalCount = (info) => {
    setCartTotal(info);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(addAddress(address));
  }

  useEffect(()=>{
    dispatch(allCart());
  },[])

  return (
    <Box>
    {!state?.user?.data?.address?<Box sx={{position:"relative"}}>
      <Box sx={{width:"100%",height:"85dvh",backgroundColor:"gray"}}></Box>
      <Box sx={{position:"absolute",top:"40%",left:"35%",zIndex:"10",backgroundColor:"white",p:"25px",textAlign:"center",minWidth:"400px"}}>
        <h6>Enter Your Address</h6>
        <input type="text" placeholder="Enter Your Address" name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} style={{width:"100%",padding:"7px",marginTop:"7px",outline:"none"}} />
        <Button sx={{width:"100%",backgroundColor:"#FB4997",mt:"15px",color:"white","&:hover":{backgroundColor:"#FB4997"}}} onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
      </Box>
    </Box>:
    <Box className="container" sx={{display:"flex",justifyContent:"space-between",alignItems:"start",mt:"40px",mb:"40px"}}>
      {state?.cart?.data?.length > 0 ? (
        <Box>
        <p>Your Address:{state?.user?.data?.address}</p>
        <CartTable />
        </Box>
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
    </Box>}
    </Box>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { allWishList } from "../../state/slices/wishListSlice";
import { removeToWishList } from "../../state/slices/wishListSlice";
import EmptyItem from "../../components/EmptyItem";
import emptyWishlist from "../../assets/images/emptywishlist.jpg";
import SliderCard from "../../components/SliderCard";
import CancelIcon from "@mui/icons-material/Cancel";

const WishList = () => {
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  const handleDelete = (product_id) => {
    dispatch(removeToWishList(product_id));
    setDataLoaded(!dataLoaded);
    dispatch(allWishList());
  };
  const userWishList = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(allWishList());
  }, [dataLoaded]);

  return (
    <Box>
      <Box className="container" sx={{ maxWidth: "80%" }}>
        {userWishList?.data?.length === 0 ? (
          <EmptyItem
            image={emptyWishlist}
            title="Your Wishlist is empty!"
            description="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
            buttonContent="Continue Shopping"
            navigation="/products"
            maxwidth="50%"
          />
        ) : (
          <Box sx={{ m: "40px 0px" }}>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#111C85",
                fontWeight: "700",
                mb: "40px",
              }}
            >
              My WishList
            </Typography>
            <Box sx={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
              {userWishList?.data?.length &&
                userWishList?.data?.map((wishlist) => {
                  return (
                    <Box sx={{ position: "relative" }}>
                      <SliderCard
                        image={`${process.env.REACT_APP_URL}/assets/${wishlist.picturePath}`}
                        Product={wishlist.bookname}
                        price={wishlist.price}
                      />
                      <CancelIcon
                        sx={{
                          position: "absolute",
                          left: "95%",
                          bottom: "96%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(wishlist._id);
                        }}
                      />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WishList;

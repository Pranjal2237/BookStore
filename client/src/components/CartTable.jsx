import { Box,Typography } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../state/slices/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { allCart } from "../state/slices/cartSlice";

const CartTable = () => {
  const state = useSelector((state) => state);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  const dispatch = useDispatch();

  const handleDelete = (cart_id) => {
    dispatch(removeToCart(cart_id));
    setDataLoaded(!dataLoaded);
  };
  useEffect(()=>{
    dispatch(allCart())
  },[dataLoaded])

  return (
    <Box sx={{ flexBasis: "50%" }}>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                ">th": {
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#151875",
                },
              }}
            >
              <TableCell sx={{ p: "16px 0px" }}>book</TableCell>
              <TableCell sx={{ p: "16px 0px", minWidth: "100px" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.cart?.data?.map((book, index) => (
              <TableRow
                key={book.bookname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" sx={{ p: "16px 0px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "15%",
                        display: "flex",
                        position: "relative",
                        backgroundColor: "#F5F5F5",
                        p: "15px 0px",
                      }}
                    >
                      <CancelIcon
                        sx={{
                          cursor: "pointer",
                          position: "absolute",
                          left: "90%",
                          bottom: "90%",
                          fontSize: "1rem",
                        }}
                        onClick={() => {
                          handleDelete(book._id);
                        }}
                      />
                      <img
                        src={`${process.env.REACT_APP_URL}/assets/${book.picturePath}`}
                        alt=""
                        width="80%"
                        style={{ margin: "auto" }}
                      />
                    </Box>
                    <Typography sx={{ color: "#A1A8C1" }}>
                      {book.bookname}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#15245E",
                    fontSize: "12px",
                    fontWeight: "600",
                    p: "16px 0px",
                    textAlign: "left",
                  }}
                >
                  Rs. {book.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartTable;

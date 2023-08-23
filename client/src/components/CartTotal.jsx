import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CardTotal = ({ totalCount }) => {
  const [itemsPrice, setitemsPrice] = useState({});

  const state = useSelector((state) => state);

  function createData(name, calories) {
    return { name, calories};
  }

  let subtotal = 0;

  state?.cart?.data?.map((item) => {
    subtotal = subtotal + item.price;
  });

  let taxtotal = Math.ceil(subtotal * 0.1);

  let delivery = 40;
  if (subtotal > 500) {
    delivery =0;
  }

  let total = subtotal + taxtotal;

  if (delivery === Number(40)) {
    total = total + delivery;
  }

  useEffect(() => {
    totalCount({itemsPrice:subtotal,taxPrice:taxtotal,shippingPrice:delivery,totalPrice:total})
  }, [subtotal]);

  const rows = [
    createData("Subtotals:", subtotal),
    createData("Taxtotals:", taxtotal),
    createData("Delivey Charges:", delivery),
    createData("Totals:", total),
  ];

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#F4F4FC",
        p: "15px",
        mt: "20px",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", backgroundColor: "#F4F4FC" }}
      >
        <Table sx={{ Width: "100%", p: "10px" }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "600", fontSize: "13px", color: "#1D3178" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "13px", color: "#1D3178", fontWeight: "600" }}
                >
                  Rs. {row.calories}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CardTotal;

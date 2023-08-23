import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import ProductCard from "../../components/ProductCard";
import Pagination from "@mui/material/Pagination";

const Home = ({ bookname }) => {
  const [newPage, setnewPage] = useState(1);
  const handleChange = (event, value) => {
    setnewPage(value);
  };

  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <div className="container product-flex-div">
        <SideBar
          currentPage={newPage}
          bookname={bookname}
          setnewPage={setnewPage}
        />
        <ProductCard />
      </div>
      <Pagination
        count={5}
        page={newPage}
        onChange={handleChange}
        sx={{m:"auto",mt: "30px"}}
        size="large"
        shape="rounded"
        color='secondary'
      />
    </Box>
  );
};

export default Home;

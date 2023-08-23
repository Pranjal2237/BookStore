import React, { useEffect, useState } from "react";
import { productFilter } from "../data/categories";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { allBooks } from "../state/slices/bookSlice";

const SideBar = ({ currentPage, bookname = "",setnewPage }) => {
  const [filter, setfilter] = useState({
    currentPage: currentPage,
    genre:"",
    priceSort:"",
    priceL: 0,
    priceH: 10000000000,
    bookname:bookname
  });
  if (bookname !== filter.bookname) {
    setfilter({ ...filter, bookname: bookname });
  }
  const [genreSelected, setgenreSelected] = useState();
  const [proceSortSelected, setproceSortSelected] = useState();
  const [priceSelected, setpriceSelected] = useState();

  if (currentPage !== filter.currentPage) {
    setfilter({ ...filter, currentPage: currentPage });
  }

  const handleGenre = (genre, idx) => {
    if (idx === genreSelected) {
      setgenreSelected(undefined);
      const temp = { ...filter };
      temp.genre = "";
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    } else {
      setgenreSelected(idx);
      const temp = { ...filter };
      temp.genre = genre;
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    }
  };

  const handlePriceSort = (priceSort, idx) => {
    if (idx === proceSortSelected) {
      setproceSortSelected(undefined);
      const temp = { ...filter };
      temp.priceSort = 0;
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    } else {
      setproceSortSelected(idx);
      const temp = { ...filter };
      temp.priceSort = priceSort;
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    }
  };

  const handlePrice = (price, idx) => {
    if (idx === priceSelected) {
      setpriceSelected(undefined);
      const temp = { ...filter };
      temp.priceL = 0;
      temp.priceH = 1000000000;
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    } else {
      setpriceSelected(idx);
      const temp = { ...filter };
      const priceRange = price.split("-");
      temp.priceL = priceRange[0];
      temp.priceH = priceRange[1];
      temp.currentPage=1;
      setnewPage(1);
      setfilter(() => ({ ...temp }));
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allBooks(filter));
  }, [filter]);

  return (
    <Box sx={{ position: "sticky", top: "110px", p: "10px 0px" }}>
      <Box
        sx={{
          ">p": {
            fontSize: "18px",
            textDecoration: "underline",
            color: "#151875",
            fontWeight: "700",
          },
        }}
      >
        <Typography>Genres</Typography>
        {productFilter.genres.map((genre, idx) => {
          return (
            <Box sx={{ m: "15px 0px" }}>
              <input
                type="checkbox"
                key={genre}
                checked={genreSelected === idx ? true : false}
                onChange={() => {
                  handleGenre(genre, idx);
                }}
                style={{ marginRight: "10px" }}
              />
              <label style={{ fontSize: "16px", color: "#7E81A2" }}>
                {genre}
              </label>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          ">p": {
            fontSize: "18px",
            textDecoration: "underline",
            color: "#151875",
            fontWeight: "700",
          },
          mt: "50px",
        }}
      >
        <Typography>Price Filter</Typography>
        {productFilter.priceRange.map((price, idx) => {
          return (
            <Box sx={{ m: "15px 0px" }}>
              <input
                type="checkbox"
                key={price}
                checked={priceSelected === idx ? true : false}
                onChange={() => {
                  handlePrice(price, idx);
                }}
                style={{ marginRight: "10px" }}
              />
              <label style={{ fontSize: "16px", color: "#7E81A2" }}>
                {price}
              </label>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          ">p": {
            fontSize: "18px",
            textDecoration: "underline",
            color: "#151875",
            fontWeight: "700",
          },
          mt: "50px",
        }}
      >
        <Typography>Price Order</Typography>
        {productFilter.priceOrder.map((order, idx) => {
          return (
            <Box sx={{ m: "15px 0px" }}>
              <input
                type="checkbox"
                checked={proceSortSelected === idx ? true : false}
                onChange={() => {
                  handlePriceSort(order, idx);
                }}
                style={{ marginRight: "10px" }}
              />
              <label style={{ fontSize: "16px", color: "#7E81A2" }}>
                {order===-1?"High To Low":"Low To High"}
              </label>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SideBar;

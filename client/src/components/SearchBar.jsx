import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

const SearchBar = ({setCategory,setOption}) => {
  const [keyword, setkeyword] =useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategory(keyword);
    setkeyword("");
    setOption("Products")
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      sx={{
        borderRadius: "0px",
        border: "1px solid #e3e3e3",
        minWidth: "250px",
        pl: 2,
        boxShadow: "none",
        display: "flex",
        flexBasis: "30%",
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={keyword}
        style={{ border: "none", outline: "none", flexGrow: "1" }}
        onChange={(e) => {
          setkeyword(e.target.value);
        }}
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
          color: "#fff",
          background: "#FB2E86",
          borderRadius: "0px",
          height: "40px",
          "&:hover":{
            background:"#FB2E86"
          }
        }}
      >
        <Search fontSize="1.2rem" />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyItem = ({
  image,
  title,
  description,
  buttonContent = "",
  navigation = "/",
  maxwidth,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigation);
  };
  return (
    <Box
      sx={{
        maxWidth: "60%",
        textAlign: "center",
        m: "auto",
        minHeight: "400px",
      }}
    >
      <Box sx={{ maxWidth: maxwidth, margin: "auto" }}>
        <img src={image} alt="" />
      </Box>
      <Typography
        sx={{
          fontSize: "18px",
          color: "#151875",
          fontWeight: "600",
          mt: "20px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          maxWidth: "56%",
          m: "auto",
          fontSize: "13px",
          color: "#A9ACC6",
          mt: "7px",
        }}
      >
        {description}
      </Typography>
      {buttonContent && (
        <Button
          sx={{
            textTransform: "none",
            backgroundColor: "#FB2E86",
            mt: "20px",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#FB2E86" },
          }}
          onClick={handleClick}
        >
          {buttonContent}
        </Button>
      )}
    </Box>
  );
};

export default EmptyItem;

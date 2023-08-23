import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { logout } from "../../state/slices/userSlice";

const Header = ({setKeyword}) => {
  const [option, setOption] = useState("Home");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
      setOption("");
  };

  return (
    <Box style={{ position: "sticky", top: "0", zIndex: "10" }}>
      <Box bgcolor={"#7E33E0"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            ">a": { textDecoration: "none" },
          }}
          className="container"
        >
          <Box
            sx={{
              display: "flex",
              flexBasis: "25%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <EmailOutlinedIcon sx={{ color: "#ffffff", fontSize: "1rem" }} />
              <Typography
                sx={{ color: "#ffffff", fontSize: "13px", fontWeight: "600" }}
              >
                shop@email.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
              <LocalPhoneOutlinedIcon
                sx={{ color: "#ffffff", fontSize: "1rem" }}
              />
              <Typography
                sx={{ color: "#ffffff", fontSize: "13px", fontWeight: "600" }}
              >
                8081249719
              </Typography>
            </Box>
          </Box>
          {state?.user?.data == null ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexBasis: "20%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <LoginOutlinedIcon
                  sx={{ color: "#ffffff", fontSize: "1rem" }}
                />
                <Link to="/login">
                  <Button
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      p: "10px 0px",
                      justifyContent: "left",
                      fontSize: "13px",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <Person2OutlinedIcon
                  sx={{ color: "#ffffff", fontSize: "1rem" }}
                />
                <Link to="/signup">
                  <Button
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      p: "10px 0px",
                      justifyContent: "left",
                      fontSize: "13px",
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexBasis: "25%",
              }}
            >
              <Box
                className="profile-main-div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                  position: "relative",
                  "&:hover>div":{
                    display:"block"
                  }
                }}
              >
                <Person2OutlinedIcon
                  sx={{ color: "#ffffff", fontSize: "1rem" }}
                />
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "600",
                    p: "10px 0px",
                  }}
                >
                  Profile
                </Typography>
                <Box
                  className="header-subprofile-div"
                  sx={{
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    top: "40px",
                    zIndex: "10",
                    textAlign: "left",
                    minWidth: "300px",
                    p: "25px",
                    left: "-180%",
                    boxShadow: "#C2C5E1 0px 2px 12px",
                    display: "none",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#151875",
                      pb: "7px",
                      borderBottom: "1px solid #A9ACC6",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Hello {state?.user?.data?.name}
                  </Typography>
                  <Link
                    to="/user/mybook"
                    style={{
                      textDecoration: "none",
                      color: "#A9ACC6",
                      display: "block",
                      margin: "15px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        "&:hover": { fontWeight: "600" },
                      }}
                      onClick={() => {
                  setOption("");
                }}
                    >
                      My Books
                    </Typography>
                  </Link>
                  <Link
                    to="/user/wishlist"
                    style={{
                      textDecoration: "none",
                      color: "#A9ACC6",
                      display: "block",
                      margin: "15px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        "&:hover": { fontWeight: "600" },
                      }}
                      onClick={() => {
                  setOption("");
                      }}
                    >
                      Wishlist
                    </Typography>
                  </Link>
                  <Link
                    to="/cart"
                    style={{
                      textDecoration: "none",
                      color: "#A9ACC6",
                      display: "block",
                      margin: "15px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        "&:hover": { fontWeight: "600" },
                      }}
                      onClick={() => {
                  setOption("");
                      }}
                    >
                      Cart
                    </Typography>
                  </Link>
                  <Link
                    to="/user/uploadbook"
                    style={{
                      textDecoration: "none",
                      color: "#A9ACC6",
                      display: "block",
                      margin: "15px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        "&:hover": { fontWeight: "600" },
                      }}
                      onClick={() => {
                  setOption("");
                      }}
                    >
                      Upload Book
                    </Typography>
                  </Link>
                  <Box
                    style={{
                      textDecoration: "none",
                      color: "#A9ACC6",
                      margin: "15px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        "&:hover": { fontWeight: "600" },
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <FavoriteBorderOutlinedIcon
                  sx={{ color: "#ffffff", fontSize: "1rem" }}
                />
                <Link to="/user/wishlist">
                  <Button
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      p: "10px 0px",
                      justifyContent: "left",
                      fontSize: "13px",
                    }}
                  >
                    Wishlist
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ color: "#ffffff", fontSize: "1rem" }}
                />
                <Link to="/cart">
                  <Button
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      p: "10px 0px",
                      justifyContent: "left",
                      fontSize: "13px",
                    }}
                  >
                    Cart
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "white" }}>
        <Box
          className="container"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "15px 0px",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component={"h1"}
              fontWeight="800"
              color="#0D0E43"
              fontSize="2rem"
            >
              BookStore
            </Box>
          </Link>
          <SearchBar setCategory={setKeyword} setOption={setOption} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

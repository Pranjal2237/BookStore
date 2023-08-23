import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { signupUser } from "../../state/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [user, setuser] = useState({name:'',email:'',password:''})
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleName=(event)=>{
    const temp={...user}
    temp.name=event.target.value;
    setuser(()=>({...temp}))
  }

  const handleEmail=(event)=>{
    const temp={...user}
    temp.email=event.target.value;
    setuser(()=>({...temp}))
  }

  const handlePassword=(event)=>{
    const temp={...user}
    temp.password=event.target.value;
    setuser(()=>({...temp}))
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(signupUser(user))
    navigate('/login');
  }

  return (
    <Box>
    <Box
      sx={{
        maxWidth:"30%",
        m:"auto",
        marginTop: "4rem",
        marginBottom: "5rem",
        color: "gray",
        boxShadow: "#C2C5E1 0px 8px 10px",
        p: "2rem",
        color:"#9096B2"
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontSize: "25px", fontWeight: "700", color: "black" }}
        >
          Signup
        </Typography>
        <Typography sx={{}}>Please create account detail below</Typography>
      </Box>
      <Box marginTop="1.5rem">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              ">input": {
                height: "35px",
                marginTop: "15px",
                outline: "none",
                border: "1px solid gray",
                pl: "10px",
              },
            }}
          >
            <input type="text" placeholder="Enter Username" value={user.name} onChange={(e)=>handleName(e)} />
            <input type="email" placeholder="Email Address" value={user.email} onChange={(e)=>handleEmail(e)} />
            <input type="password" placeholder="Password" value={user.password} onChange={(e)=>handlePassword(e)} />
            <Button
              type="submit"
              sx={{
                background: "#FB2E86",
                color: "white",
                marginTop: "35px",
                textTransform:"none",
                "&:hover": { background: "#FB2E86" },
              }}
            >
              Sign Up
            </Button>
            <Link
              to="/login"
              style={{ textDecoration: "none",marginTop: "25px" }}
            >
              <Button sx={{ textTransform: "none",margin:'auto',width: "100%",color:"#9096B2" }}>
                Already have an account? SignIn
              </Button>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
    </Box>
  );
};

export default Signup;

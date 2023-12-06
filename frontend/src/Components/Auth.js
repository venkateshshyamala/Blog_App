import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { authAction } from "../Store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const changeHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, password } = inputs;

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5008/api/user/${type}`, {
        name: name,
        email: email,
        password: password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const sumbitHanlder = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authAction.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authAction.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
    setInputs({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={sumbitHanlder} autoComplete="off">
        <Box
          maxWidth={500}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxShadow="10px 10px 20px #ccc"
          borderRadius={10}
          padding={3}
          margin="auto"
          marginTop={7}
          border={1}
          borderColor="#ccc"
        >
          <Typography
            variant="h3"
            padding={3}
            textAlign="center"
            fontFamily={"inherit"}
          >
            {isSignup ? "Signup" : "login"}
          </Typography>
          {isSignup && (
            <Box display={"flex"}>
              <IconButton>
                <PersonIcon />
              </IconButton>
              <TextField
                onChange={changeHandler}
                name="name"
                value={name}
                margin="normal"
                placeholder="Name"
                required="true"
              />
            </Box>
          )}
          <Box display={"flex"}>
            <IconButton>
              <EmailIcon />
            </IconButton>
            <TextField
              onChange={changeHandler}
              name="email"
              value={email}
              type={"email"}
              margin="normal"
              placeholder="Email"
              required="true"
            />
          </Box>
          <Box display={"flex"}>
            <IconButton>
              <KeyIcon />
            </IconButton>
            <TextField
              onChange={changeHandler}
              name="password"
              value={password}
              type={"password"}
              margin="normal"
              placeholder="Password"
              required="true"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2, borderRadius: 3 }}
          >
            Submit
          </Button>
          <Button
            color="warning"
            sx={{ marginTop: 1 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            Click to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";

const AddBlog = () => {
  const [inputs, setinputs] = useState({
    title: "",
    image: "",
    description: "",
  });

  const { title, image, description } = inputs;

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5008/api/blog/add", {
        title: title,
        image: image,
        description: description,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const changeHandler = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data));
    setinputs({
      title: "",
      image: "",
      description: "",
    });
  };

  return (
    <div>
      <form onSubmit={sumbitHandler} autoComplete="off">
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"60%"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          border={2}
          borderRadius={10}
          borderColor="linear-gradient(90deg, rgba(20,48,124,1) 0%, rgba(60,71,221,1) 70%, rgba(10,61,142,1) 100%)"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography variant="h3" textAlign={"center"} fontFamily={"inherit"}>
            Post Your Blog
          </Typography>
          <InputLabel sx={{ fontWeight: "bold" }}>Title</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={title}
            name="title"
            onChange={changeHandler}
          />
          <InputLabel sx={{ fontWeight: "bold" }}>ImageUrl</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={image}
            name="image"
            onChange={changeHandler}
          />
          <InputLabel sx={{ fontWeight: "bold" }}>Description</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={description}
            name="description"
            onChange={changeHandler}
          />
          <Button
            sx={{ mt: 3, borderRadius: 4, width: "10%", margin: "auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;

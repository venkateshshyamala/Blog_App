import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";

const BlogDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
  });

  const changeHandler = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5008/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setinputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5008/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(blog);

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs/"));
  };

  return (
    <div>
      {inputs && (
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
            <Typography
              variant="h3"
              textAlign={"center"}
              fontFamily={"inherit"}
            >
              Edit Your Blog
            </Typography>
            <InputLabel>Title</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              value={inputs.title}
              name="title"
              onChange={changeHandler}
            />
            <InputLabel>Description</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              value={inputs.description}
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
      )}
    </div>
  );
};

export default BlogDetails;

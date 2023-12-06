import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Box,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

const BlogItem = ({ id, title, description, image, user, isUser }) => {
  const navigate = useNavigate();

  const editHandler = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 3,
          mb: 2,
          borderRadius: "10px",
          padding: 3,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton sx={{ marginLeft: "auto" }} onClick={editHandler}>
              <ModeEditIcon color="warning" />
            </IconButton>
            <IconButton onClick={editHandler}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {user.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<b>{title}</b>}
        />
        <CardMedia component="img" height="194" image={image} alt="image" />
        <br />
        <hr />
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontSize={17}>
            <b>{user.charAt(0).toUpperCase() + user.slice(1)} :</b>{" "}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogItem;

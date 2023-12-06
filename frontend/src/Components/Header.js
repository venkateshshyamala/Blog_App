import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { authAction } from "../Store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(20,48,124,1) 0%, rgba(60,71,221,1) 70%, rgba(10,61,142,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                color="warning"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Login
              </Button>{" "}
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authAction.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              color="warning"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
